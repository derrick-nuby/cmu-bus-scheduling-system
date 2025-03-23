import { z } from "zod"

// Route creation schema
export const routeCreateSchema = z.object({
  organizationId: z.string().min(1, "Organization is required"),
  name: z.string().min(1, "Route name is required"),
  description: z.string().min(1, "Description is required"),
  code: z.string().optional(),
  logo: z.string().optional(),
})

export type RouteCreateFormData = z.infer<typeof routeCreateSchema>

// Route update schema
export const routeUpdateSchema = z.object({
  name: z.string().min(1, "Route name is required"),
  description: z.string().min(1, "Description is required"),
  logo: z.string().optional(),
})

export type RouteUpdateFormData = z.infer<typeof routeUpdateSchema>

