# CMU BUS SCHEDULING SYSTEM

a real-time bus tracking system designed to help users track the location of buses in real time. It aims to provide accurate and timely information about bus locations, making it easier for passengers and stakeholders to plan their journeys effectively.

My project bridges the gap between unreliable bus systems and real-time GPS tracking. By ensuring continuous location updates, it enhances the public transport experience, reduces delays, and provides valuable insights for both passengers and bus operators.

## **Prisma Schema (`schema.prisma`)**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrganizationType {
  COMPANY
  EVENT
}

enum UserRole {
  SUPER_ADMIN
  ORG_ADMIN
}

enum BusStatus {
  ACTIVE
  INACTIVE
}

enum PassengerStatus {
  WAITING
  BOARDED
  LEFT
}

model Organization {
  id         String   @id @default(cuid())
  name       String
  type       OrganizationType
  domain     String?
  createdAt  DateTime @default(now())
  users      User[]
  routes     Route[]
}

model User {
  id              String         @id @default(cuid())
  organization    Organization?  @relation(fields: [organizationId], references: [id])
  organizationId  String?
  email           String         @unique
  password        String
  name            String
  role            UserRole
  oauthProvider   String?        // e.g., "google"
  oauthId         String?        // OAuth provider unique id
  createdAt       DateTime       @default(now())
}

model Route {
  id             String            @id @default(cuid())
  organization   Organization      @relation(fields: [organizationId], references: [id])
  organizationId String
  name           String
  description    String
  code           String            @unique
  logo           String?
  createdAt      DateTime          @default(now())
  buses          Bus[]
  busStops       BusStop[]
  passengers     Passenger[]
  liveTrackings  BusLiveTracking[]
}

model Bus {
  id                String            @id @default(cuid())
  route             Route             @relation(fields: [routeId], references: [id])
  routeId           String
  name              String
  plateNumber       String
  capacity          Int
  locationLatitude  Float?            // Updated via passenger tracking if no dedicated GPS device
  locationLongitude Float?
  status            BusStatus
  liveTrackings     BusLiveTracking[]
  passengers        Passenger[]
}

model BusStop {
  id         String   @id @default(cuid())
  route      Route    @relation(fields: [routeId], references: [id])
  routeId    String
  name       String
  latitude   Float
  longitude  Float
  busLeft    Boolean  // Indicates whether the bus has left the stop
  createdAt  DateTime @default(now())
}

model Passenger {
  id                String            @id @default(cuid())
  route             Route             @relation(fields: [routeId], references: [id])
  routeId           String
  bus               Bus?              @relation(fields: [busId], references: [id])
  busId             String?
  nickname          String
  status            PassengerStatus
  waitingLatitude   Float?            // When the passenger is waiting
  waitingLongitude  Float?
  onboardLatitude   Float?            // When the passenger is onboard and used to track the bus
  onboardLongitude  Float?
  createdAt         DateTime          @default(now())
  liveTrackings     BusLiveTracking[]
}

model BusLiveTracking {
  id           String    @id @default(cuid())
  bus          Bus       @relation(fields: [busId], references: [id])
  busId        String
  route        Route     @relation(fields: [routeId], references: [id])
  routeId      String
  passenger    Passenger  @relation(fields: [passengerId], references: [id])
  passengerId  String
  latitude     Float
  longitude    Float
  updatedAt    DateTime  @default(now())
}
```

---

## **API Endpoints**

Below is a list of the primary API endpoints my application might expose. Each endpoint includes the HTTP method, a description of its purpose, what data it will accept in the request, and what it will return in the response.

---

### **List Of All API Endpoints**

#### **Organization Endpoints**

1. **POST /organizations**

   - **Method:** POST
   - **Description:** Creates a new organization (either a company or an event).
   - **Request:** Expects a JSON body with `name`, `type` (either `"COMPANY"` or `"EVENT"`), and optional `domain`.
   - **Response:** Returns the created organization object with fields such as `id`, `name`, `type`, `domain`, and `createdAt`.

2. **GET /organizations**

   - **Method:** GET
   - **Description:** Retrieves a list of all organizations (accessible by super admin).
   - **Request:** No body; may use query parameters for filtering if needed.
   - **Response:** Returns an array of organization objects.

3. **GET /organizations/:id**

   - **Method:** GET
   - **Description:** Retrieves details for a specific organization.
   - **Request:** The `id` of the organization is provided in the URL.
   - **Response:** Returns the organization object.

4. **PUT /organizations/:id**

   - **Method:** PUT
   - **Description:** Updates an organization’s details.
   - **Request:** Expects a JSON body with updatable fields (e.g., `name`, `domain`).
   - **Response:** Returns the updated organization object.

5. **DELETE /organizations/:id**
   - **Method:** DELETE
   - **Description:** Deletes an organization.
   - **Request:** The `id` is provided in the URL.
   - **Response:** Returns a confirmation message of deletion.

---

#### **User Endpoints**

1. **POST /users/signup**

   - **Method:** POST
   - **Description:** Registers a new user account. Supports both traditional email/password and OAuth (e.g., Google).
   - **Request:** Expects a JSON body with `email`, `password` (if not using OAuth), `name`, `role` (`"SUPER_ADMIN"` or `"ORG_ADMIN"`), `organizationId` (if applicable), and optionally `oauthProvider` and `oauthId`.
   - **Response:** Returns the created user object (excluding sensitive data like the password).

2. **POST /users/login**

   - **Method:** POST
   - **Description:** Authenticates a user via traditional credentials or OAuth.
   - **Request:** Expects a JSON body with either `email` and `password` or OAuth token data.
   - **Response:** Returns a JSON Web Token (JWT) along with the user details.

3. **GET /users/:id**

   - **Method:** GET
   - **Description:** Retrieves details for a specific user.
   - **Request:** The user `id` is provided in the URL.
   - **Response:** Returns the user object.

4. **GET /users**

   - **Method:** GET
   - **Description:** Retrieves a list of users. For org admins, this is typically filtered by their organization; super admins can view all users.
   - **Request:** May include query parameters such as `organizationId`.
   - **Response:** Returns an array of user objects.

5. **PUT /users/:id**

   - **Method:** PUT
   - **Description:** Updates user details such as `name`, `password`, or `role`.
   - **Request:** Expects a JSON body with the fields to update.
   - **Response:** Returns the updated user object.

6. **DELETE /users/:id**
   - **Method:** DELETE
   - **Description:** Deletes a user account.
   - **Request:** The user `id` is provided in the URL.
   - **Response:** Returns a confirmation message.

---

#### **Route Endpoints**

1. **POST /routes**

   - **Method:** POST
   - **Description:** Creates a new route for a given organization or event.
   - **Request:** Expects a JSON body with `organizationId`, `name`, `description`, `code` (or it can be generated automatically), and optional `logo`.
   - **Response:** Returns the newly created route object.

2. **GET /routes**

   - **Method:** GET
   - **Description:** Retrieves a list of routes. The results can be filtered by `organizationId` or via the public route code.
   - **Request:** May use query parameters such as `organizationId` or `code`.
   - **Response:** Returns an array of route objects.

3. **GET /routes/:id**

   - **Method:** GET
   - **Description:** Retrieves detailed information for a specific route, optionally including associated buses, stops, and passengers.
   - **Request:** The route `id` is provided in the URL.
   - **Response:** Returns the route object.

4. **PUT /routes/:id**

   - **Method:** PUT
   - **Description:** Updates the details of a route.
   - **Request:** Expects a JSON body with the fields to update (e.g., `name`, `description`, `logo`).
   - **Response:** Returns the updated route object.

5. **DELETE /routes/:id**
   - **Method:** DELETE
   - **Description:** Deletes a specific route.
   - **Request:** The route `id` is provided in the URL.
   - **Response:** Returns a confirmation message.

---

#### **Bus Endpoints**

1. **POST /buses**

   - **Method:** POST
   - **Description:** Creates a new bus under a specific route.
   - **Request:** Expects a JSON body with `routeId`, `name`, `plateNumber`, `capacity`, `status`, and optionally `locationLatitude` and `locationLongitude`.
   - **Response:** Returns the created bus object.

2. **GET /buses**

   - **Method:** GET
   - **Description:** Retrieves a list of buses. Can be filtered by `routeId`.
   - **Request:** May include a query parameter for `routeId`.
   - **Response:** Returns an array of bus objects.

3. **GET /buses/:id**

   - **Method:** GET
   - **Description:** Retrieves details for a specific bus.
   - **Request:** The bus `id` is provided in the URL.
   - **Response:** Returns the bus object.

4. **PUT /buses/:id**

   - **Method:** PUT
   - **Description:** Updates a bus’s details (such as name, capacity, status, or location).
   - **Request:** Expects a JSON body with the fields to update.
   - **Response:** Returns the updated bus object.

5. **DELETE /buses/:id**
   - **Method:** DELETE
   - **Description:** Deletes a bus.
   - **Request:** The bus `id` is provided in the URL.
   - **Response:** Returns a confirmation message.

---

#### **Bus Stop Endpoints**

1. **POST /bus-stops**

   - **Method:** POST
   - **Description:** Creates a new bus stop for a route.
   - **Request:** Expects a JSON body with `routeId`, `name`, `latitude`, `longitude`, and an initial `busLeft` status (usually `false`).
   - **Response:** Returns the created bus stop object.

2. **GET /bus-stops**

   - **Method:** GET
   - **Description:** Retrieves a list of bus stops, optionally filtered by `routeId`.
   - **Request:** May include a query parameter for `routeId`.
   - **Response:** Returns an array of bus stop objects.

3. **GET /bus-stops/:id**

   - **Method:** GET
   - **Description:** Retrieves details for a specific bus stop.
   - **Request:** The bus stop `id` is provided in the URL.
   - **Response:** Returns the bus stop object.

4. **PUT /bus-stops/:id**

   - **Method:** PUT
   - **Description:** Updates a bus stop’s details, such as marking `busLeft` as true (when the bus departs) or false (when a new bus arrives).
   - **Request:** Expects a JSON body with the fields to update (e.g., `name`, `latitude`, `longitude`, `busLeft`).
   - **Response:** Returns the updated bus stop object.

5. **DELETE /bus-stops/:id**
   - **Method:** DELETE
   - **Description:** Deletes a bus stop.
   - **Request:** The bus stop `id` is provided in the URL.
   - **Response:** Returns a confirmation message.

---

#### **Passenger Endpoints**

1. **POST /passengers**

   - **Method:** POST
   - **Description:** Registers a passenger on a route (i.e., check-in).
   - **Request:** Expects a JSON body with `routeId`, optional `busId`, `nickname`, initial `status` (set to `"WAITING"`), and optionally `waitingLatitude` and `waitingLongitude`.
   - **Response:** Returns the created passenger object.

2. **GET /passengers**

   - **Method:** GET
   - **Description:** Retrieves a list of passengers, optionally filtered by `routeId` or `busId`.
   - **Request:** May include query parameters for filtering.
   - **Response:** Returns an array of passenger objects.

3. **GET /passengers/:id**

   - **Method:** GET
   - **Description:** Retrieves details for a specific passenger.
   - **Request:** The passenger `id` is provided in the URL.
   - **Response:** Returns the passenger object.

4. **PUT /passengers/:id**

   - **Method:** PUT
   - **Description:** Updates a passenger’s details—for instance, changing their `status` from `"WAITING"` to `"BOARDED"` or updating their location fields (`waitingLatitude/Longitude` or `onboardLatitude/Longitude`).
   - **Request:** Expects a JSON body with the fields to update.
   - **Response:** Returns the updated passenger object.

5. **DELETE /passengers/:id**
   - **Method:** DELETE
   - **Description:** Deletes a passenger record.
   - **Request:** The passenger `id` is provided in the URL.
   - **Response:** Returns a confirmation message.

---

#### **Bus Live Tracking Endpoints**

1. **POST /live-tracking**

   - **Method:** POST
   - **Description:** Creates a new live tracking update for a bus. This endpoint is triggered when a passenger onboard sends their current location, which is then used to update the bus’s live position.
   - **Request:** Expects a JSON body with `busId`, `routeId`, `passengerId`, `latitude`, and `longitude`.
   - **Response:** Returns the created live tracking record.

2. **GET /live-tracking**

   - **Method:** GET
   - **Description:** Retrieves a list of live tracking updates. The results can be filtered by `busId` or `routeId`.
   - **Request:** May include query parameters such as `busId` or `routeId`.
   - **Response:** Returns an array of live tracking records.

3. **GET /live-tracking/:id**
   - **Method:** GET
   - **Description:** Retrieves a specific live tracking update by its ID.
   - **Request:** The live tracking record `id` is provided in the URL.
   - **Response:** Returns the live tracking record.

---

These endpoints provide a thorough API for managing organizations, users, routes, buses, bus stops, passengers, and live tracking data. They are designed to enforce multi-tenant access:

- **Super Admins** can view and manage all data.
- **Organization/Event Admins** can only view and manage their own data.
- **Passengers** only access data associated with the public route code provided (e.g., maps.pro/YTN45KMM5).

## Your task

I want you to implement those routes in nextjs version "next": "15.1.7", as it is the one that i am currently using, please implement all the api routes and not that i will put them in the src folder app folder and in api folder like src/app/api folder. also for the routes that require dynamic id or names please use the below methods as i have found other do not really work when getting ids.

below is an example of how i got the eventid in my last event management system app, so use a method like this for dynamic getting of file

```TypeScript

// snippet location: src/app/api/events/[eventId]/route.ts (old project)

type RouteParams = Promise<{ eventId: string; }>;

export async function GET(req: Request, { params }: { params: RouteParams; }) {
  const resolvedParams = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: resolvedParams.eventId },
```

please implement all of them ot once and then generate a utils file called id generator that generates a 10 letter id that is unique and capital letter ad number only no characters.
