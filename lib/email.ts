import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOtp(to: string, code: string): Promise<void> {
  const from = process.env.FROM_EMAIL ?? 'onboarding@resend.dev'
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: 'Your login code',
    html: `<p>Your Suffolk Muslim Society admin login code is:</p><h2 style="letter-spacing:4px">${code}</h2><p>This code expires in 10 minutes.</p>`,
    text: `Your login code is: ${code}\n\nThis code expires in 10 minutes.`,
  })
  if (error) {
    console.error('[sendOtp] Resend error:', error)
    throw new Error(error.message)
  }
  console.log('[sendOtp] sent, id:', data?.id)
}
