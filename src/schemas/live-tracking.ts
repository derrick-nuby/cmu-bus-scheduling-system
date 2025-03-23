import { z } from "zod"

// Live tracking creation schema
export const liveTrackingCreateSchema = z.object({
  busId: z.string().min(1, "Bus is required"),
  routeId: z.string().min(1, "Route is required"),
  passengerId: z.string().min(1, "Passenger is required"),
  latitude: z.coerce.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce.number().min(-180).max(180, "Longitude must be between -180 and 180"),
})

export type LiveTrackingCreateFormData = z.infer<typeof liveTrackingCreateSchema>

