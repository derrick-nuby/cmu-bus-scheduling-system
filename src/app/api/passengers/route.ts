import { NextResponse } from "next/server";
import { PrismaClient, PassengerStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new passenger
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { routeId, busId, nickname, status, waitingLatitude, waitingLongitude } = body;

    // Validate required fields
    if (!routeId || !nickname) {
      return NextResponse.json({ error: "Route ID and nickname are required fields" }, { status: 400 });
    }

    // Check if route exists
    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    // Check if bus exists if busId is provided
    if (busId) {
      const bus = await prisma.bus.findUnique({
        where: { id: busId },
      });

      if (!bus) {
        return NextResponse.json({ error: "Bus not found" }, { status: 404 });
      }
    }

    // Create the passenger
    const passenger = await prisma.passenger.create({
      data: {
        routeId,
        busId,
        nickname,
        status: status || PassengerStatus.WAITING,
        waitingLatitude,
        waitingLongitude,
      },
    });

    return NextResponse.json(passenger, { status: 201 });
  } catch (error) {
    console.error("Error creating passenger:", error);
    return NextResponse.json({ error: "Failed to create passenger" }, { status: 500 });
  }
}

// Get all passengers
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const routeId = searchParams.get("routeId");
    const busId = searchParams.get("busId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};
    if (routeId) whereClause.routeId = routeId;
    if (busId) whereClause.busId = busId;

    const passengers = await prisma.passenger.findMany({
      where: whereClause,
    });

    return NextResponse.json(passengers);
  } catch (error) {
    console.error("Error fetching passengers:", error);
    return NextResponse.json({ error: "Failed to fetch passengers" }, { status: 500 });
  }
}

