import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific bus stop
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const busStop = await prisma.busStop.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!busStop) {
      return NextResponse.json({ error: "Bus stop not found" }, { status: 404 })
    }

    return NextResponse.json(busStop)
  } catch (error) {
    console.error("Error fetching bus stop:", error)
    return NextResponse.json({ error: "Failed to fetch bus stop" }, { status: 500 })
  }
}

// Update a bus stop
export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const body = await req.json()
    const { name, latitude, longitude, busLeft } = body

    // Check if bus stop exists
    const existingBusStop = await prisma.busStop.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingBusStop) {
      return NextResponse.json({ error: "Bus stop not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (latitude !== undefined) updateData.latitude = latitude
    if (longitude !== undefined) updateData.longitude = longitude
    if (busLeft !== undefined) updateData.busLeft = busLeft

    const updatedBusStop = await prisma.busStop.update({
      where: { id: resolvedParams.id },
      data: updateData,
    })

    return NextResponse.json(updatedBusStop)
  } catch (error) {
    console.error("Error updating bus stop:", error)
    return NextResponse.json({ error: "Failed to update bus stop" }, { status: 500 })
  }
}

// Delete a bus stop
export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    // Check if bus stop exists
    const existingBusStop = await prisma.busStop.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingBusStop) {
      return NextResponse.json({ error: "Bus stop not found" }, { status: 404 })
    }

    await prisma.busStop.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Bus stop deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting bus stop:", error)
    return NextResponse.json({ error: "Failed to delete bus stop" }, { status: 500 })
  }
}

