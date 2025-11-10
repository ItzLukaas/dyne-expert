import { NextResponse } from "next/server"
import { Resend } from "resend"

// Brug miljøvariablen RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const formData = await req.formData()
  const name = formData.get("contact[name]")
  const email = formData.get("contact[email]")
  const body = formData.get("contact[body]")

  try {
    await resend.emails.send({
      from: "Dyne Expert <no-reply@dyne-expert.dk>",
      to: "kontaktsvendsen@gmail.com",
      replyTo: email?.toString(), // Brug replyTo i stedet for reply_to
      subject: `Ny besked fra ${name}`,
      html: `
        <h2>Ny kontaktbesked fra Dyne Expert hjemmesiden</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Besked:</strong></p>
        <p>${body}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
