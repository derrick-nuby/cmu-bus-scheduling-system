import { z } from "zod"
import { BusStatus } from "@prisma/client"

// Bus creation schema
export const busCreateSchema = z.object({
  routeId: z.string().min(1, "Route is required"),
  name: z.string().min(1, "Bus name is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number"),
  status: z.nativeEnum(BusStatus, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  locationLatitude: z.coerce.number().optional(),
  locationLongitude: z.coerce.number().optional(),
})

export type BusCreateFormData = z.infer<typeof busCreateSchema>

// Bus update schema
export const busUpdateSchema = z.object({
  name: z.string().min(1, "Bus name is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  capacity: z.coerce.number().int().positive("Capacity must be a positive number"),
  status: z.nativeEnum(BusStatus, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  locationLatitude: z.coerce.number().optional(),
  locationLongitude: z.coerce.number().optional(),
})

export type BusUpdateFormData = z.infer<typeof busUpdateSchema>

