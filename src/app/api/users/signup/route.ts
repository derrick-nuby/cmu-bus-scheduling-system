import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email/send-welcome-email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, oauthProvider, oauthId } = body;

    // Validate required fields
    if (!email || (!password && !oauthProvider) || !name) {
      return NextResponse.json(
        { error: "Email, name, and either password or OAuth details are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    // Hash password if provided
    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create user with default role (ORG_ADMIN) but no organization yet
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.ORG_ADMIN, // Default role
        oauthProvider,
        oauthId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        createdAt: true,
      },
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(name, email);
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Continue with user creation even if email fails
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

