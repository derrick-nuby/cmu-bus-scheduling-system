import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RouteParams = Promise<{ id: string; }>;

// Update user's organization
export async function PUT(req: Request, { params }: { params: RouteParams; }) {
  const resolvedParams = await params;
  try {
    const body = await req.json();
    const { organizationId } = body;

    if (!organizationId) {
      return NextResponse.json({ error: "Organization ID is required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    // Update user's organization
    const updatedUser = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: {
        organizationId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user's organization:", error);
    return NextResponse.json({ error: "Failed to update user's organization" }, { status: 500 });
  }
}

// Remove user's organization
export async function DELETE(req: Request, { params }: { params: RouteParams; }) {
  const resolvedParams = await params;
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user's organization
    const updatedUser = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: {
        organizationId: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error removing user's organization:", error);
    return NextResponse.json({ error: "Failed to remove user's organization" }, { status: 500 });
  }
}