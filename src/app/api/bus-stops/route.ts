import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new bus stop
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { routeId, name, latitude, longitude, busLeft } = body;

    // Validate required fields
    if (!routeId || !name || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Route ID, name, latitude, and longitude are required fields" },
        { status: 400 },
      );
    }

    // Check if route exists
    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    // Create the bus stop
    const busStop = await prisma.busStop.create({
      data: {
        routeId,
        name,
        latitude,
        longitude,
        busLeft: busLeft !== undefined ? busLeft : false,
      },
    });

    return NextResponse.json(busStop, { status: 201 });
  } catch (error) {
    console.error("Error creating bus stop:", error);
    return NextResponse.json({ error: "Failed to create bus stop" }, { status: 500 });
  }
}

// Get all bus stops
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

      const busStops = await prisma.busStop.findMany({
        where: { routeId },
      });

      return NextResponse.json(busStops);
    } else {
      const busStops = await prisma.busStop.findMany();
      return NextResponse.json(busStops);
    }
  } catch (error) {
    console.error("Error fetching bus stops:", error);
    return NextResponse.json({ error: "Failed to fetch bus stops" }, { status: 500 });
  }
}

