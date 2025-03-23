import { z } from "zod"
import { PassengerStatus } from "@prisma/client"

// Passenger creation schema
export const passengerCreateSchema = z.object({
  routeId: z.string().min(1, "Route is required"),
  busId: z.string().optional(),
  nickname: z.string().min(1, "Nickname is required"),
  status: z
    .nativeEnum(PassengerStatus, {
      errorMap: () => ({ message: "Please select a valid status" }),
    })
    .default(PassengerStatus.WAITING),
  waitingLatitude: z.coerce.number().optional(),
  waitingLongitude: z.coerce.number().optional(),
})

export type PassengerCreateFormData = z.infer<typeof passengerCreateSchema>

// Passenger update schema
export const passengerUpdateSchema = z.object({
  busId: z.string().optional(),
  status: z.nativeEnum(PassengerStatus, {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  waitingLatitude: z.coerce.number().optional(),
  waitingLongitude: z.coerce.number().optional(),
  onboardLatitude: z.coerce.number().optional(),
  onboardLongitude: z.coerce.number().optional(),
})

export type PassengerUpdateFormData = z.infer<typeof passengerUpdateSchema>

