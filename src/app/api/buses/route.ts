import { NextResponse } from "next/server";
import { PrismaClient, BusStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new bus
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { routeId, name, plateNumber, capacity, status, locationLatitude, locationLongitude } = body;

    // Validate required fields
    if (!routeId || !name || !plateNumber || !capacity || !status) {
      return NextResponse.json(
        { error: "Route ID, name, plate number, capacity, and status are required fields" },
        { status: 400 },
      );
    }

    // Validate bus status
    if (!Object.values(BusStatus).includes(status as BusStatus)) {
      return NextResponse.json({ error: "Invalid bus status. Must be ACTIVE or INACTIVE" }, { status: 400 });
    }

    // Check if route exists
    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    // Create the bus
    const bus = await prisma.bus.create({
      data: {
        routeId,
        name,
        plateNumber,
        capacity,
        status: status as BusStatus,
        locationLatitude,
        locationLongitude,
      },
    });

    return NextResponse.json(bus, { status: 201 });
  } catch (error) {
    console.error("Error creating bus:", error);
    return NextResponse.json({ error: "Failed to create bus" }, { status: 500 });
  }
}

// Get all buses
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const routeId = searchParams.get("routeId");

    if (routeId) {
      // Check if route exists
      const route = await prisma.route.findUnique({
        where: { id: routeId },
      });

      if (!route) {
        return NextResponse.json({ error: "Route not found" }, { status: 404 });
      }

      const buses = await prisma.bus.findMany({
        where: { routeId },
      });

      return NextResponse.json(buses);
    } else {
      const buses = await prisma.bus.findMany();
      return NextResponse.json(buses);
    }
  } catch (error) {
    console.error("Error fetching buses:", error);
    return NextResponse.json({ error: "Failed to fetch buses" }, { status: 500 });
  }
}

