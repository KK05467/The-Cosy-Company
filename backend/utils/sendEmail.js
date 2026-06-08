import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendOtpEmail = async (email, otp) => {
  return await resend.emails.send({
    from: "Cosy <onboarding@resend.dev>",
    to: email,
    subject: "Forgot Password OTP",
    html: `
      <h2>Your OTP Code</h2>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `,
  })
}