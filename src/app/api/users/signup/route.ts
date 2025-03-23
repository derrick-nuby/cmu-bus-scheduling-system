import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role, organizationId, oauthProvider, oauthId } = body;

    // Validate required fields
    if (!email || (!password && !oauthProvider) || !name || !role) {
      return NextResponse.json(
        { error: "Email, name, role, and either password or OAuth details are required" },
        { status: 400 },
      );
    }

    // Validate user role
    if (!Object.values(UserRole).includes(role as UserRole)) {
      return NextResponse.json({ error: "Invalid user role. Must be SUPER_ADMIN or ORG_ADMIN" }, { status: 400 });
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

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as UserRole,
        organizationId,
        oauthProvider,
        oauthId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        oauthProvider: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

