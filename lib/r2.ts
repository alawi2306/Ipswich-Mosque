import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

const region = process.env.AWS_REGION ?? 'us-east-1'
const bucket = process.env.S3_BUCKET_NAME!

export const r2 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export function r2PublicUrl(key: string): string {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export async function uploadToR2(
  file: File,
  folder = 'uploads'
): Promise<{ url: string; key: string; fileType: string }> {
  const ext = file.name.split('.').pop() ?? 'bin'
  const key = `mosque/${folder}/${randomUUID()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await r2.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  )

  return { url: r2PublicUrl(key), key, fileType: file.type }
}
