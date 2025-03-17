import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type RouteParams = Promise<{ id: string }>

// Get a specific organization
export async function GET(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    return NextResponse.json(organization)
  } catch (error) {
    console.error("Error fetching organization:", error)
    return NextResponse.json({ error: "Failed to fetch organization" }, { status: 500 })
  }
}

// Update an organization
export async function PUT(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    const body = await req.json()
    const { name, domain } = body

    // Check if organization exists
    const existingOrg = await prisma.organization.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingOrg) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id: resolvedParams.id },
      data: {
        name: name !== undefined ? name : undefined,
        domain: domain !== undefined ? domain : undefined,
      },
    })

    return NextResponse.json(updatedOrganization)
  } catch (error) {
    console.error("Error updating organization:", error)
    return NextResponse.json({ error: "Failed to update organization" }, { status: 500 })
  }
}

// Delete an organization
export async function DELETE(req: Request, { params }: { params: RouteParams }) {
  const resolvedParams = await params
  try {
    // Check if organization exists
    const existingOrg = await prisma.organization.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!existingOrg) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    await prisma.organization.delete({
      where: { id: resolvedParams.id },
    })

    return NextResponse.json({ message: "Organization deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting organization:", error)
    return NextResponse.json({ error: "Failed to delete organization" }, { status: 500 })
  }
}

