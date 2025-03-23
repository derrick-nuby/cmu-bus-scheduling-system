import fs from 'fs';

// Base collection structure from the provided template
const baseCollection = {
  "info": {
    "_postman_id": "8a6fd8a3-8475-4484-85b8-d0a9f7dca887",
    "name": "CMU Bus Scheduling System",
    "description": "A real-time bus tracking system designed to help users track the location of buses in real time. It aims to provide accurate and timely information about bus locations, making it easier for passengers and stakeholders to plan their journeys effectively.\n\nMy project bridges the gap between unreliable bus systems and real-time GPS tracking. By ensuring continuous location updates, it enhances the public transport experience, reduces delays, and provides valuable insights for both passengers and bus operators.",
    "schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
    "_exporter_id": "24842410"
  },
  "item": [],
  "auth": {
    "type": "bearer",
    "bearer": {
      "token": "{{auth_token}}"
    }
  },
  "event": [
    {
      "listen": "prerequest",
      "script": {
        "type": "text/javascript",
        "packages": {},
        "exec": [""]
      }
    },
    {
      "listen": "test",
      "script": {
        "type": "text/javascript",
        "packages": {},
        "exec": [""]
      }
    }
  ],
  "variable": [
    {
      "key": "dev-url",
      "value": "http://localhost:3000/api",
      "type": "string"
    },
    {
      "key": "prod-url",
      "value": "https://cmu-bus-scheduling-system-az5v.vercel.app/api",
      "type": "string"
    },
    {
      "key": "auth_token",
      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2I5ODY5MjZiZGE0YmE5NWM4NGRlNSIsIm5hbWUiOiJkZXJyaWNrIiwiZW1haWwiOiJkZXJyaWNraXJhZHVAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM2MTUzNTU3fQ.bDsaWU5sic2C3n9KiNRUEF8LJB7-4sQRC_ahhUdkixY",
      "type": "string"
    }
  ]
};

// Create folders for each resource type
const organizationsFolder = {
  name: "Organizations",
  item: [],
  description: "Endpoints for managing organizations (companies or events)"
};

const usersFolder = {
  name: "Users",
  item: [],
  description: "Endpoints for user management and authentication"
};

const routesFolder = {
  name: "Routes",
  item: [],
  description: "Endpoints for managing bus routes"
};

const busesFolder = {
  name: "Buses",
  item: [],
  description: "Endpoints for managing buses"
};

const busStopsFolder = {
  name: "Bus Stops",
  item: [],
  description: "Endpoints for managing bus stops"
};

const passengersFolder = {
  name: "Passengers",
  item: [],
  description: "Endpoints for managing passengers"
};

const liveTrackingFolder = {
  name: "Live Tracking",
  item: [],
  description: "Endpoints for real-time bus tracking"
};

// Helper function to create a request
function createRequest(name, method, endpoint, description, body = null) {
  const request = {
    name,
    request: {
      method,
      header: [
        {
          key: "Content-Type",
          value: "application/json"
        }
      ],
      url: {
        raw: `{{dev-url}}${endpoint}`,
        host: ["{{dev-url}}"],
        path: endpoint.split('/').filter(p => p)
      },
      description
    },
    response: []
  };

  if (body && (method === "POST" || method === "PUT")) {
    request.request.body = {
      mode: "raw",
      raw: JSON.stringify(body, null, 2),
      options: {
        raw: {
          language: "json"
        }
      }
    };
  }

  return request;
}

// Add Organization endpoints
organizationsFolder.item.push(
  createRequest(
    "Create Organization",
    "POST",
    "/organizations",
    "Creates a new organization (company or event)",
    {
      name: "Example Organization",
      type: "COMPANY",
      domain: "example.com"
    }
  ),
  createRequest(
    "Get All Organizations",
    "GET",
    "/organizations",
    "Retrieves a list of all organizations"
  ),
  createRequest(
    "Get Organization by ID",
    "GET",
    "/organizations/:id",
    "Retrieves details for a specific organization"
  ),
  createRequest(
    "Update Organization",
    "PUT",
    "/organizations/:id",
    "Updates an organization's details",
    {
      name: "Updated Organization Name",
      domain: "updated-example.com"
    }
  ),
  createRequest(
    "Delete Organization",
    "DELETE",
    "/organizations/:id",
    "Deletes an organization"
  )
);

// Add User endpoints
usersFolder.item.push(
  createRequest(
    "Register User",
    "POST",
    "/users/signup",
    "Registers a new user account",
    {
      email: "user@example.com",
      password: "password123",
      name: "John Doe",
      role: "ORG_ADMIN",
      organizationId: "org123"
    }
  ),
  createRequest(
    "Login User",
    "POST",
    "/users/login",
    "Authenticates a user and returns a JWT token",
    {
      email: "user@example.com",
      password: "password123"
    }
  ),
  createRequest(
    "Get All Users",
    "GET",
    "/users",
    "Retrieves a list of all users"
  ),
  createRequest(
    "Get User by ID",
    "GET",
    "/users/:id",
    "Retrieves details for a specific user"
  ),
  createRequest(
    "Update User",
    "PUT",
    "/users/:id",
    "Updates a user's details",
    {
      name: "Updated Name",
      role: "ORG_ADMIN"
    }
  ),
  createRequest(
    "Delete User",
    "DELETE",
    "/users/:id",
    "Deletes a user account"
  )
);

// Add Route endpoints
routesFolder.item.push(
  createRequest(
    "Create Route",
    "POST",
    "/routes",
    "Creates a new route for a given organization",
    {
      organizationId: "org123",
      name: "Campus Shuttle",
      description: "Route between main campus and residence halls",
      code: "CAMPUS01",
      logo: "https://example.com/logo.png"
    }
  ),
  createRequest(
    "Get All Routes",
    "GET",
    "/routes",
    "Retrieves a list of all routes"
  ),
  createRequest(
    "Get Routes by Organization",
    "GET",
    "/routes?organizationId=org123",
    "Retrieves routes for a specific organization"
  ),
  createRequest(
    "Get Route by ID",
    "GET",
    "/routes/:id",
    "Retrieves details for a specific route"
  ),
  createRequest(
    "Update Route",
    "PUT",
    "/routes/:id",
    "Updates a route's details",
    {
      name: "Updated Route Name",
      description: "Updated route description",
      logo: "https://example.com/updated-logo.png"
    }
  ),
  createRequest(
    "Delete Route",
    "DELETE",
    "/routes/:id",
    "Deletes a route"
  )
);

// Add Bus endpoints
busesFolder.item.push(
  createRequest(
    "Create Bus",
    "POST",
    "/buses",
    "Creates a new bus for a specific route",
    {
      routeId: "route123",
      name: "Bus 101",
      plateNumber: "CMU-1234",
      capacity: 40,
      status: "ACTIVE",
      locationLatitude: 40.4432,
      locationLongitude: -79.9428
    }
  ),
  createRequest(
    "Get All Buses",
    "GET",
    "/buses",
    "Retrieves a list of all buses"
  ),
  createRequest(
    "Get Buses by Route",
    "GET",
    "/buses?routeId=route123",
    "Retrieves buses for a specific route"
  ),
  createRequest(
    "Get Bus by ID",
    "GET",
    "/buses/:id",
    "Retrieves details for a specific bus"
  ),
  createRequest(
    "Update Bus",
    "PUT",
    "/buses/:id",
    "Updates a bus's details",
    {
      name: "Updated Bus Name",
      plateNumber: "CMU-5678",
      capacity: 45,
      status: "ACTIVE",
      locationLatitude: 40.4432,
      locationLongitude: -79.9428
    }
  ),
  createRequest(
    "Delete Bus",
    "DELETE",
    "/buses/:id",
    "Deletes a bus"
  )
);

// Add Bus Stop endpoints
busStopsFolder.item.push(
  createRequest(
    "Create Bus Stop",
    "POST",
    "/bus-stops",
    "Creates a new bus stop for a route",
    {
      routeId: "route123",
      name: "Main Campus",
      latitude: 40.4432,
      longitude: -79.9428,
      busLeft: false
    }
  ),
  createRequest(
    "Get All Bus Stops",
    "GET",
    "/bus-stops",
    "Retrieves a list of all bus stops"
  ),
  createRequest(
    "Get Bus Stops by Route",
    "GET",
    "/bus-stops?routeId=route123",
    "Retrieves bus stops for a specific route"
  ),
  createRequest(
    "Get Bus Stop by ID",
    "GET",
    "/bus-stops/:id",
    "Retrieves details for a specific bus stop"
  ),
  createRequest(
    "Update Bus Stop",
    "PUT",
    "/bus-stops/:id",
    "Updates a bus stop's details",
    {
      name: "Updated Stop Name",
      latitude: 40.4435,
      longitude: -79.9430,
      busLeft: true
    }
  ),
  createRequest(
    "Delete Bus Stop",
    "DELETE",
    "/bus-stops/:id",
    "Deletes a bus stop"
  )
);

// Add Passenger endpoints
passengersFolder.item.push(
  createRequest(
    "Create Passenger",
    "POST",
    "/passengers",
    "Registers a passenger on a route",
    {
      routeId: "route123",
      busId: "bus123",
      nickname: "Student1",
      status: "WAITING",
      waitingLatitude: 40.4432,
      waitingLongitude: -79.9428
    }
  ),
  createRequest(
    "Get All Passengers",
    "GET",
    "/passengers",
    "Retrieves a list of all passengers"
  ),
  createRequest(
    "Get Passengers by Route",
    "GET",
    "/passengers?routeId=route123",
    "Retrieves passengers for a specific route"
  ),
  createRequest(
    "Get Passengers by Bus",
    "GET",
    "/passengers?busId=bus123",
    "Retrieves passengers for a specific bus"
  ),
  createRequest(
    "Get Passenger by ID",
    "GET",
    "/passengers/:id",
    "Retrieves details for a specific passenger"
  ),
  createRequest(
    "Update Passenger",
    "PUT",
    "/passengers/:id",
    "Updates a passenger's details",
    {
      busId: "bus123",
      status: "BOARDED",
      onboardLatitude: 40.4432,
      onboardLongitude: -79.9428
    }
  ),
  createRequest(
    "Delete Passenger",
    "DELETE",
    "/passengers/:id",
    "Deletes a passenger record"
  )
);

// Add Live Tracking endpoints
liveTrackingFolder.item.push(
  createRequest(
    "Create Live Tracking Record",
    "POST",
    "/live-tracking",
    "Creates a new live tracking update for a bus",
    {
      busId: "bus123",
      routeId: "route123",
      passengerId: "passenger123",
      latitude: 40.4432,
      longitude: -79.9428
    }
  ),
  createRequest(
    "Get All Live Tracking Records",
    "GET",
    "/live-tracking",
    "Retrieves a list of all live tracking records"
  ),
  createRequest(
    "Get Live Tracking by Bus",
    "GET",
    "/live-tracking?busId=bus123",
    "Retrieves live tracking records for a specific bus"
  ),
  createRequest(
    "Get Live Tracking by Route",
    "GET",
    "/live-tracking?routeId=route123",
    "Retrieves live tracking records for a specific route"
  ),
  createRequest(
    "Get Live Tracking Record by ID",
    "GET",
    "/live-tracking/:id",
    "Retrieves a specific live tracking record"
  )
);

// Add all folders to the collection
baseCollection.item = [
  organizationsFolder,
  usersFolder,
  routesFolder,
  busesFolder,
  busStopsFolder,
  passengersFolder,
  liveTrackingFolder
];

// Write the complete collection to output.json
fs.writeFileSync('output.json', JSON.stringify(baseCollection, null, 2));