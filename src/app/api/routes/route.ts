import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateUniqueId } from "@/lib/id-generator";

const prisma = new PrismaClient();

// Create a new route
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organizationId, name, description, code, logo } = body;

    // Validate required fields
    if (!organizationId || !name || !description) {
      return NextResponse.json({ error: "Organization ID, name, and description are required fields" }, { status: 400 });
    }

    // Check if organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    // Generate a unique code if not provided
    const routeCode = code || generateUniqueId();

    // Create the route
    const route = await prisma.route.create({
      data: {
        organizationId,
        name,
        description,
        code: routeCode,
        logo,
      },
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    console.error("Error creating route:", error);
    return NextResponse.json({ error: "Failed to create route" }, { status: 500 });
  }
}

// Get all routes
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organizationId = searchParams.get("organizationId");
    const code = searchParams.get("code");

    let routes;
    if (organizationId) {
      routes = await prisma.route.findMany({
        where: { organizationId },
      });
    } else if (code) {
      routes = await prisma.route.findMany({
        where: { code },
      });
    } else {
      routes = await prisma.route.findMany();
    }

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}

