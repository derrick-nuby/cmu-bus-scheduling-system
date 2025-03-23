import { NextResponse } from "next/server";
import { PrismaClient, OrganizationType } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new organization
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, domain } = body;

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json({ error: "Name and type are required fields" }, { status: 400 });
    }

    // Validate organization type
    if (!Object.values(OrganizationType).includes(type as OrganizationType)) {
      return NextResponse.json({ error: "Invalid organization type. Must be COMPANY or EVENT" }, { status: 400 });
    }

    const organization = await prisma.organization.create({
      data: {
        name,
        type: type as OrganizationType,
        domain,
      },
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (error) {
    console.error("Error creating organization:", error);
    return NextResponse.json({ error: "Failed to create organization" }, { status: 500 });
  }
}

// Get all organizations
export async function GET() {
  try {
    const organizations = await prisma.organization.findMany();
    return NextResponse.json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 });
  }
}

