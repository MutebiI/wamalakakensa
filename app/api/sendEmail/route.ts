import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mutebiibrahim503@gmail.com",
        pass: "hnxb aalz vtlk wwgt",
      },
    });

    const mailOptions = {
      from: `"Website Contact Form" <mutebiibrahim503@gmail.com>`, // must stay your Gmail
      replyTo: email, // ✅ key line
      to: "mutebiibrahim503@gmail.com",
      subject: subject,
      text: `SENDER NAME: ${name}\n\nSENDER EMAIL: ${email}\n\n--------------------------MESSAGE--------------------------:\n\n${message}`, // also include in body
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      ok: true,
      message: "✅ Email successfully sent!",
      time: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("❌ Email send error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email", details: String(err) },
      { status: 500 }
    );
  }
}
