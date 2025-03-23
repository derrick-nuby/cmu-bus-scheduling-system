import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, oauthToken } = body;

    // Handle traditional login
    if (email && password) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

      // Return user data without password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({
        user: userWithoutPassword,
        token,
      });
    }
    // Handle OAuth login (simplified)
    else if (oauthToken) {
      // In a real implementation, you would verify the OAuth token with the provider
      // For now, we'll just check if a user with the provided OAuth ID exists

      // This is a placeholder - in a real app, you'd decode the token and extract user info
      const oauthId = "sample-oauth-id"; // This would come from decoding the token
      const oauthProvider = "google"; // This would come from decoding the token

      const user = await prisma.user.findFirst({
        where: {
          oauthId,
          oauthProvider,
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found with this OAuth account" }, { status: 401 });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" });

      // Return user data
      return NextResponse.json({
        user,
        token,
      });
    } else {
      return NextResponse.json({ error: "Invalid login method" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

