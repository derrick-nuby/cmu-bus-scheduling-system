import { z } from "zod"

// Bus stop creation schema
export const busStopCreateSchema = z.object({
  routeId: z.string().min(1, "Route is required"),
  name: z.string().min(1, "Stop name is required"),
  latitude: z.coerce.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  busLeft: z.boolean().default(false),
})

export type BusStopCreateFormData = z.infer<typeof busStopCreateSchema>

// Bus stop update schema
export const busStopUpdateSchema = z.object({
  name: z.string().min(1, "Stop name is required"),
  latitude: z.coerce.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  busLeft: z.boolean(),
})

export type BusStopUpdateFormData = z.infer<typeof busStopUpdateSchema>

