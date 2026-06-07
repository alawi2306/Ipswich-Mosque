import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminSession } from '@/lib/auth'

interface PlaceResult {
  address?: string
  lat?: number
  lng?: number
  placeId?: string
  rating?: number
  reviewCount?: number
  phone?: string
  website?: string
}

function extractFromGoogleUrl(url: string): { name: string | null; placeId: string | null } {
  const pathMatch = url.match(/\/maps\/place\/([^/@?]+)/)
  const name = pathMatch ? decodeURIComponent(pathMatch[1].replace(/\+/g, ' ')) : null
  const placeIdMatch = url.match(/!1s(ChIJ[^!&]+)/)
  return { name, placeId: placeIdMatch?.[1] ?? null }
}

async function fetchGooglePlaceDetails(name: string, placeId: string | null): Promise<PlaceResult> {
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY
  if (!apiKey) return {}
  try {
    type RawPlace = {
      id?: string
      formattedAddress?: string
      location?: { latitude?: number; longitude?: number }
      rating?: number
      userRatingCount?: number
      nationalPhoneNumber?: string
      websiteUri?: string
    }
    let place: RawPlace | null = null

    if (placeId) {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'displayName,formattedAddress,location,rating,userRatingCount,nationalPhoneNumber,websiteUri',
        },
      })
      if (res.ok) place = await res.json()
    }

    if (!place) {
      const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri',
        },
        body: JSON.stringify({
          textQuery: `${name} Ipswich Suffolk`,
          locationRestriction: {
            circle: { center: { latitude: 52.0584, longitude: 1.1438 }, radius: 25000 },
          },
        }),
      })
      if (res.ok) {
        const data = await res.json()
        place = (data.places?.[0] as RawPlace) ?? null
      }
    }

    if (!place) return {}
    return {
      address: place.formattedAddress,
      lat: place.location?.latitude,
      lng: place.location?.longitude,
      placeId: place.id ?? placeId ?? undefined,
      rating: place.rating,
      reviewCount: place.userRatingCount,
      phone: place.nationalPhoneNumber,
      website: place.websiteUri,
    }
  } catch {
    return {}
  }
}

export async function GET(request: NextRequest) {
  try { requireAdminSession(request) } catch (r) { return r as Response }
  const submissions = await prisma.halalSubmission.findMany({ orderBy: { submittedAt: 'desc' } })
  return NextResponse.json(submissions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { category, googleUrl, hmc, prayer, family, notes } = body
  let { name } = body

  if (!category) return NextResponse.json({ error: 'Category required' }, { status: 400 })

  let placeDetails: PlaceResult = {}
  if (googleUrl) {
    const { name: urlName, placeId } = extractFromGoogleUrl(googleUrl)
    if (!name && urlName) name = urlName
    placeDetails = await fetchGooglePlaceDetails(urlName ?? name ?? '', placeId)
  }

  if (!name) return NextResponse.json({ error: 'Could not determine business name — please enter it manually' }, { status: 400 })

  let isAdmin = false
  try { requireAdminSession(request); isAdmin = true } catch {}

  const submission = await prisma.halalSubmission.create({
    data: {
      name,
      category,
      googleUrl: googleUrl || null,
      hmc: hmc ?? false,
      prayer: prayer ?? false,
      family: family ?? false,
      notes: notes || null,
      ...placeDetails,
      status: isAdmin ? 'approved' : 'pending',
    },
  })
  return NextResponse.json(submission, { status: 201 })
}
