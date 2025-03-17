import { NextResponse } from "next/server"
import { PrismaClient, BusStatus } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific bus
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const bus = await prisma.bus.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!bus) {
      return NextResponse.json({ error: "Bus not found" }, { status: 404 })
    }

    return NextResponse.json(bus)
  } catch (error) {
    console.error("Error fetching bus:", error)
    return NextResponse.json({ error: "Failed to fetch bus" }, { status: 500 })
  }
}

// Update a bus
export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const body = await req.json()
    const { name, plateNumber, capacity, status, locationLatitude, locationLongitude } = body

    // Check if bus exists
    const existingBus = await prisma.bus.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingBus) {
      return NextResponse.json({ error: "Bus not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (plateNumber !== undefined) updateData.plateNumber = plateNumber
    if (capacity !== undefined) updateData.capacity = capacity
    if (status !== undefined) {
      if (!Object.values(BusStatus).includes(status as BusStatus)) {
        return NextResponse.json({ error: "Invalid bus status. Must be ACTIVE or INACTIVE" }, { status: 400 })
      }
      updateData.status = status
    }
    if (locationLatitude !== undefined) updateData.locationLatitude = locationLatitude
    if (locationLongitude !== undefined) updateData.locationLongitude = locationLongitude

    const updatedBus = await prisma.bus.update({
      where: { id: resolvedParams.id },
      data: updateData,
    })

    return NextResponse.json(updatedBus)
  } catch (error) {
    console.error("Error updating bus:", error)
    return NextResponse.json({ error: "Failed to update bus" }, { status: 500 })
  }
}

// Delete a bus
export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    // Check if bus exists
    const existingBus = await prisma.bus.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingBus) {
      return NextResponse.json({ error: "Bus not found" }, { status: 404 })
    }

    await prisma.bus.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Bus deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting bus:", error)
    return NextResponse.json({ error: "Failed to delete bus" }, { status: 500 })
  }
}

