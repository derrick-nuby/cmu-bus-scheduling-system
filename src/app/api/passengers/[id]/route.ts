import { NextResponse } from "next/server"
import { PrismaClient, PassengerStatus } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific passenger
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const passenger = await prisma.passenger.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!passenger) {
      return NextResponse.json({ error: "Passenger not found" }, { status: 404 })
    }

    return NextResponse.json(passenger)
  } catch (error) {
    console.error("Error fetching passenger:", error)
    return NextResponse.json({ error: "Failed to fetch passenger" }, { status: 500 })
  }
}

// Update a passenger
export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const body = await req.json()
    const { busId, status, waitingLatitude, waitingLongitude, onboardLatitude, onboardLongitude } = body

    // Check if passenger exists
    const existingPassenger = await prisma.passenger.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingPassenger) {
      return NextResponse.json({ error: "Passenger not found" }, { status: 404 })
    }

    // Check if bus exists if busId is provided
    if (busId) {
      const bus = await prisma.bus.findUnique({
        where: { id: busId },
      })

      if (!bus) {
        return NextResponse.json({ error: "Bus not found" }, { status: 404 })
      }
    }

    // Validate passenger status if provided
    if (status && !Object.values(PassengerStatus).includes(status as PassengerStatus)) {
      return NextResponse.json(
        { error: "Invalid passenger status. Must be WAITING, BOARDED, or LEFT" },
        { status: 400 },
      )
    }

    // Prepare update data
    const updateData: any = {}
    if (busId !== undefined) updateData.busId = busId
    if (status !== undefined) updateData.status = status
    if (waitingLatitude !== undefined) updateData.waitingLatitude = waitingLatitude
    if (waitingLongitude !== undefined) updateData.waitingLongitude = waitingLongitude
    if (onboardLatitude !== undefined) updateData.onboardLatitude = onboardLatitude
    if (onboardLongitude !== undefined) updateData.onboardLongitude = onboardLongitude

    const updatedPassenger = await prisma.passenger.update({
      where: { id: resolvedParams.id },
      data: updateData,
    })

    return NextResponse.json(updatedPassenger)
  } catch (error) {
    console.error("Error updating passenger:", error)
    return NextResponse.json({ error: "Failed to update passenger" }, { status: 500 })
  }
}

// Delete a passenger
export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    // Check if passenger exists
    const existingPassenger = await prisma.passenger.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingPassenger) {
      return NextResponse.json({ error: "Passenger not found" }, { status: 404 })
    }

    await prisma.passenger.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Passenger deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting passenger:", error)
    return NextResponse.json({ error: "Failed to delete passenger" }, { status: 500 })
  }
}

