import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create a new live tracking record
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { busId, routeId, passengerId, latitude, longitude } = body

    // Validate required fields
    if (!busId || !routeId || !passengerId || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Bus ID, route ID, passenger ID, latitude, and longitude are required fields" },
        { status: 400 },
      )
    }

    // Check if bus exists
    const bus = await prisma.bus.findUnique({
      where: { id: busId },
    })

    if (!bus) {
      return NextResponse.json({ error: "Bus not found" }, { status: 404 })
    }

    // Check if route exists
    const route = await prisma.route.findUnique({
      where: { id: routeId },
    })

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    // Check if passenger exists
    const passenger = await prisma.passenger.findUnique({
      where: { id: passengerId },
    })

    if (!passenger) {
      return NextResponse.json({ error: "Passenger not found" }, { status: 404 })
    }

    // Create the live tracking record
    const liveTracking = await prisma.busLiveTracking.create({
      data: {
        busId,
        routeId,
        passengerId,
        latitude,
        longitude,
      },
    })

    // Update the bus location
    await prisma.bus.update({
      where: { id: busId },
      data: {
        locationLatitude: latitude,
        locationLongitude: longitude,
      },
    })

    return NextResponse.json(liveTracking, { status: 201 })
  } catch (error) {
    console.error("Error creating live tracking record:", error)
    return NextResponse.json({ error: "Failed to create live tracking record" }, { status: 500 })
  }
}

// Get live tracking records
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const busId = searchParams.get("busId")
    const routeId = searchParams.get("routeId")

    const whereClause: any = {}
    if (busId) whereClause.busId = busId
    if (routeId) whereClause.routeId = routeId

    const liveTrackingRecords = await prisma.busLiveTracking.findMany({
      where: whereClause,
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json(liveTrackingRecords)
  } catch (error) {
    console.error("Error fetching live tracking records:", error)
    return NextResponse.json({ error: "Failed to fetch live tracking records" }, { status: 500 })
  }
}

