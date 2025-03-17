# CMU BUS SCHEDULING SYSTEM

---

## **1️⃣ Organizations Table**

| Column Name  | Type                  | Description                                                                     |
| ------------ | --------------------- | ------------------------------------------------------------------------------- |
| `id`         | UUID / String         | Unique organization ID.                                                         |
| `name`       | String                | Name of the organization (e.g., "thehuye.com" or "Girls Field Week Hackathon"). |
| `type`       | Enum (Company, Event) | Distinguishes between companies and events.                                     |
| `domain`     | String (Optional)     | Domain name (e.g., `thehuye.com`) if applicable.                                |
| `created_at` | Timestamp             | Record creation date.                                                           |

**Explanation & Relationships:**

- **Purpose:** This table stores the managing entities—whether a company or an event.
- **Logic:** Each organization can have its own set of routes, buses, and stops.
- **Relationships:**
  - **Users:** Each user (except super admins) is associated with one organization.
  - **Routes:** Every route is linked to an organization.

---

## **2️⃣ Users Table**

| Column Name       | Type                          | Description                                                                    |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `id`              | UUID / String                 | Unique user ID.                                                                |
| `organization_id` | UUID (Nullable)               | Foreign key linking to the **Organizations** table. Nullable for super admins. |
| `email`           | String (Unique)               | Email used for login.                                                          |
| `password`        | Hashed String                 | Secure login credentials (for traditional login).                              |
| `name`            | String                        | User’s full name.                                                              |
| `role`            | Enum (super_admin, org_admin) | Role determining access level.                                                 |
| `oauth_provider`  | String (Nullable)             | OAuth provider (e.g., "google").                                               |
| `oauth_id`        | String (Nullable)             | Unique ID provided by the OAuth provider.                                      |
| `created_at`      | Timestamp                     | Account creation timestamp.                                                    |

**Explanation & Relationships:**

- **Purpose:** Stores account details for managers/administrators who manage routes, buses, and stops.
- **Logic:**
  - Supports both traditional and OAuth-based logins (e.g., Google).
  - The presence of `oauth_provider` and `oauth_id` allows seamless integration with OAuth services.
- **Relationships:**
  - **Organizations:** Each non-super admin user is linked to an organization.
  - **Access:** Super admins (with no organization_id) have global access, while org admins can only manage data for their organization.

---

## **3️⃣ Routes Table**

| Column Name       | Type          | Description                                                     |
| ----------------- | ------------- | --------------------------------------------------------------- |
| `id`              | UUID / String | Unique route ID.                                                |
| `organization_id` | UUID          | Foreign key linking to the **Organizations** table.             |
| `name`            | String        | Name of the route (e.g., "Daily Campus Shuttle").               |
| `description`     | Text          | Detailed route description.                                     |
| `code`            | String (10)   | Unique alphanumeric code for public access (e.g., `YTN45KMM5`). |
| `logo`            | String (URL)  | Optional route logo.                                            |
| `created_at`      | Timestamp     | Route creation date.                                            |

**Explanation & Relationships:**

- **Purpose:** Represents a bus route. Although it may initially be just a name and description, it organizes the buses and stops.
- **Logic:**
  - The `code` field provides a public link for passengers (e.g., maps.pro/YTN45KMM5).
  - Routes are managed by an organization and can later be visualized more dynamically.
- **Relationships:**
  - **Organizations:** Each route belongs to one organization.
  - **Buses & Bus Stops:** Buses and stops are linked to a route.

---

## **4️⃣ Buses Table**

| Column Name    | Type                    | Description                                                                             |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `id`           | UUID / String           | Unique bus ID.                                                                          |
| `route_id`     | UUID                    | Foreign key linking to the **Routes** table.                                            |
| `name`         | String                  | Bus name (e.g., "Bus 101").                                                             |
| `plate_number` | String                  | Vehicle license plate (e.g., "RAD 123B").                                               |
| `capacity`     | Integer                 | Seating capacity of the bus.                                                            |
| `location`     | GeoPoint                | Latest known GPS location (updated via passengers if no dedicated device is available). |
| `status`       | Enum (Active, Inactive) | Bus operational status.                                                                 |

**Explanation & Relationships:**

- **Purpose:** Contains details about each bus used within a route.
- **Logic:**
  - The `location` field is key for real-time tracking.
  - It can be updated either by a dedicated GPS device or via passenger-provided location data.
- **Relationships:**
  - **Routes:** Each bus is assigned to a specific route.
  - **Bus Live Tracking:** Live updates can be stored in a related tracking table.

---

## **5️⃣ Bus Stops Table**

| Column Name  | Type          | Description                                          |
| ------------ | ------------- | ---------------------------------------------------- |
| `id`         | UUID / String | Unique stop ID.                                      |
| `route_id`   | UUID          | Foreign key linking to the **Routes** table.         |
| `name`       | String        | Stop name (e.g., "Main Street").                     |
| `latitude`   | Float         | GPS latitude of the stop.                            |
| `longitude`  | Float         | GPS longitude of the stop.                           |
| `bus_left`   | Boolean       | Indicates if the bus has left the stop (true/false). |
| `created_at` | Timestamp     | Stop creation timestamp.                             |

**Explanation & Relationships:**

- **Purpose:** Stores information about bus stops along a route.
- **Logic:**
  - The `bus_left` flag helps in determining whether the bus has departed, enabling UI updates and backend resets for new arrivals.
- **Relationships:**
  - **Routes:** Each stop is linked to a route, allowing organizers to group stops per route.

---

## **6️⃣ Passengers Table**

| Column Name         | Type                          | Description                                                      |
| ------------------- | ----------------------------- | ---------------------------------------------------------------- |
| `id`                | UUID / String                 | Unique passenger ID.                                             |
| `route_id`          | UUID                          | Foreign key linking to the **Routes** table.                     |
| `bus_id`            | UUID                          | The bus they are assigned to (if applicable).                    |
| `nickname`          | String                        | Passenger’s chosen or generated name.                            |
| `status`            | Enum (Waiting, Boarded, Left) | Indicates whether they are waiting, onboard, or have left.       |
| `waiting_latitude`  | Float                         | Latitude when marked as "Waiting".                               |
| `waiting_longitude` | Float                         | Longitude when marked as "Waiting".                              |
| `onboard_latitude`  | Float                         | Used when "Boarded" to broadcast the moving location of the bus. |
| `onboard_longitude` | Float                         | Used when "Boarded" to broadcast the moving location of the bus. |
| `created_at`        | Timestamp                     | Check-in timestamp.                                              |

**Explanation & Relationships:**

- **Purpose:** Tracks passengers as they interact with the system—whether they are waiting for a bus, onboard, or have left.
- **Logic:**
  - When a passenger is waiting, their location (via `waiting_latitude/longitude`) helps identify where they are.
  - Upon boarding, their location data can serve as a proxy to update the bus’s live location.
- **Relationships:**
  - **Routes:** Each passenger is associated with a route (through the public link they join).
  - **Buses:** They can be linked to a specific bus when boarding.

---

## **7️⃣ Bus Live Tracking Table (Optional/Enhanced)**

| Column Name    | Type          | Description                                  |
| -------------- | ------------- | -------------------------------------------- |
| `id`           | UUID / String | Unique tracking record ID.                   |
| `bus_id`       | UUID          | Foreign key linking to the **Buses** table.  |
| `route_id`     | UUID          | Foreign key linking to the **Routes** table. |
| `passenger_id` | UUID          | The passenger providing the location update. |
| `latitude`     | Float         | Live GPS latitude.                           |
| `longitude`    | Float         | Live GPS longitude.                          |
| `updated_at`   | Timestamp     | Timestamp of the latest update.              |

**Explanation & Relationships:**

- **Purpose:** Acts as an intermediary to store real-time location updates for buses when a dedicated GPS device is not available.
- **Logic:**
  - When a passenger on board sends a location update, this table records it so that the bus’s current location can be broadcast to all users.
- **Relationships:**
  - **Buses & Routes:** Each record links back to a specific bus and its route, ensuring that only the relevant data is shown to passengers accessing a particular public link.

---

This schema supports multi-tenant access where:

- **Super Admins** can view all organizations and their related data.
- **Organization/Event Admins** manage only the routes, buses, and stops within their own organization.
- **Passengers** access information solely through the public link associated with their route (e.g., maps.pro/YTN45KMM5).

Would you like to proceed with designing the API endpoints or further refining the authentication flows?
