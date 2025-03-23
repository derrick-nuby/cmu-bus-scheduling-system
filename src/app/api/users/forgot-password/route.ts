import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/lib/email/email-service";
import { PasswordResetTemplate } from "@/lib/email/email-templates";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json({ message: "If your email is registered, you will receive a password reset link" });
    }

    // Generate a random reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();

    // Set expiration time (1 hour from now)
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save reset code and expiration to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode,
        resetExpires,
      },
    });

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?email=${encodeURIComponent(
      email,
    )}&code=${resetCode}`;

    // Send email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      template: new PasswordResetTemplate(),
      context: {
        name: user.name,
        resetCode,
        resetLink,
      },
    });

    return NextResponse.json({
      message: "If your email is registered, you will receive a password reset link",
    });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    return NextResponse.json({ error: "Failed to process forgot password request" }, { status: 500 });
  }
}

