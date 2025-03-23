import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific live tracking record
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const liveTracking = await prisma.busLiveTracking.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!liveTracking) {
      return NextResponse.json({ error: "Live tracking record not found" }, { status: 404 })
    }

    return NextResponse.json(liveTracking)
  } catch (error) {
    console.error("Error fetching live tracking record:", error)
    return NextResponse.json({ error: "Failed to fetch live tracking record" }, { status: 500 })
  }
}

