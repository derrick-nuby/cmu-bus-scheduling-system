import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RouteParams = Promise<{ id: string; }>;

// Get a specific user
export async function GET(req: Request, { params }: { params: RouteParams; }) {
  const resolvedParams = await params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        organizationId: true,
        oauthProvider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// Update a user
export async function PUT(req: Request, { params }: { params: RouteParams; }) {
  const resolvedParams = await params;
  try {
    const body = await req.json();
    const { name, role } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;

    const updatedUser = await prisma.user.update({
      where: { id: resolvedParams.id },
      data: updateData,
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
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// Delete a user
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

    await prisma.user.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

