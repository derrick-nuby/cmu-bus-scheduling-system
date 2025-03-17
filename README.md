# CMU BUS SCHEDULING SYSTEM

This is a **bus tracking system** with **passenger status, bus stops, and route updates**. Below is my database schema:

## **Database Schema**

### **1️⃣ Passengers Table**

| Column Name         | Type                          | Description                                                       |
| ------------------- | ----------------------------- | ----------------------------------------------------------------- |
| `id`                | UUID                          | Unique passenger ID.                                              |
| `route_id`          | UUID                          | Links to the route.                                               |
| `bus_id`            | UUID                          | The bus they are waiting for or onboard.                          |
| `nickname`          | String                        | Randomly generated or user-entered name.                          |
| `status`            | Enum (Waiting, Boarded, Left) | **New** - Whether they are waiting, boarded, or left.             |
| `waiting_latitude`  | Float                         | **New** - Passenger's waiting location (latitude).                |
| `waiting_longitude` | Float                         | **New** - Passenger's waiting location (longitude).               |
| `onboard_latitude`  | Float                         | **New** - Used if they are on the bus (acts as a moving tracker). |
| `onboard_longitude` | Float                         | **New** - Used if they are on the bus (acts as a moving tracker). |
| `created_at`        | Timestamp                     | When they joined the system.                                      |

🔹 **Logic**:

- If `status = "Waiting"`, use `waiting_latitude` & `waiting_longitude` to track them.
- If `status = "Boarded"`, use `onboard_latitude` & `onboard_longitude` to track bus location.

---

### **2️⃣ Bus Stops Table**

| Column Name  | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `id`         | UUID      | Unique stop ID.                              |
| `route_id`   | UUID      | Links to the route.                          |
| `name`       | String    | Stop name (e.g., "Main Street").             |
| `latitude`   | Float     | GPS latitude.                                |
| `longitude`  | Float     | GPS longitude.                               |
| `bus_left`   | Boolean   | **New** - True if the bus has left the stop. |
| `created_at` | Timestamp | When the stop was created.                   |

🔹 **Logic**:

- When a bus reaches a stop, it sets `bus_left = false`.
- When a bus departs, it sets `bus_left = true`.
- A **backend reset** will clear this when a new bus arrives.

---

### **3️⃣ Bus Live Tracking Table (New)**

| Column Name    | Type      | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| `id`           | UUID      | Unique tracking ID.                              |
| `bus_id`       | UUID      | The bus being tracked.                           |
| `route_id`     | UUID      | Links to the route.                              |
| `passenger_id` | UUID      | **New** - The passenger providing location data. |
| `latitude`     | Float     | Live GPS latitude.                               |
| `longitude`    | Float     | Live GPS longitude.                              |
| `updated_at`   | Timestamp | Last updated timestamp.                          |

🔹 **Logic**:

- If a **passenger is inside a bus**, their location is used to track the bus.
- The most **recently updated location** is used for the bus's position.
- This **replaces the need for a GPS device on the bus**.

## **How the System Works**

1. **Passengers enter waiting status**

   - They select their **waiting location** (via GPS or manual selection).
   - Their `status` is marked as `"Waiting"`.

2. **Bus arrives at a stop**

   - Passengers **board**, and their `status` is updated to `"Boarded"`.
   - The stop’s `bus_left` field is set to `false`.

3. **Bus departs**

   - When a bus leaves a stop, the `bus_left` field is set to `true`.

4. **Passenger as Bus Tracker**

   - A **passenger inside the bus** acts as the **bus GPS device**.
   - Their location is used in the **Bus Live Tracking Table**.

5. **System resets for new buses**
   - The backend clears `bus_left` when a **new bus starts the route**.

---

## **Final Notes**

✅ **Scalability:** Works for multiple cities & transport companies.  
✅ **No GPS hardware needed:** Passengers **inside the bus** act as live location trackers.  
✅ **Data cleanup:** `waiting_latitude` & `waiting_longitude` **are cleared** once a passenger boards.

---
