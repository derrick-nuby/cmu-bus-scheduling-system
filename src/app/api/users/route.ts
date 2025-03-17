import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const organizationId = searchParams.get("organizationId")

    let users
    if (organizationId) {
      users = await prisma.user.findMany({
        where: { organizationId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          organizationId: true,
          oauthProvider: true,
          createdAt: true,
        },
      })
    } else {
      users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          organizationId: true,
          oauthProvider: true,
          createdAt: true,
        },
      })
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

