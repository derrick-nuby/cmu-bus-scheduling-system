import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific route
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const route = await prisma.route.findUnique({
      where: { id: resolvedParams.id },
      include: {
        buses: true,
        busStops: true,
        passengers: true,
      },
    })

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    return NextResponse.json(route)
  } catch (error) {
    console.error("Error fetching route:", error)
    return NextResponse.json({ error: "Failed to fetch route" }, { status: 500 })
  }
}

// Update a route
export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const body = await req.json()
    const { name, description, logo } = body

    // Check if route exists
    const existingRoute = await prisma.route.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingRoute) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    const updatedRoute = await prisma.route.update({
      where: { id: resolvedParams.id },
      data: {
        name: name !== undefined ? name : undefined,
        description: description !== undefined ? description : undefined,
        logo: logo !== undefined ? logo : undefined,
      },
    })

    return NextResponse.json(updatedRoute)
  } catch (error) {
    console.error("Error updating route:", error)
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 })
  }
}

// Delete a route
export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    // Check if route exists
    const existingRoute = await prisma.route.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingRoute) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    await prisma.route.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Route deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting route:", error)
    return NextResponse.json({ error: "Failed to delete route" }, { status: 500 })
  }
}

