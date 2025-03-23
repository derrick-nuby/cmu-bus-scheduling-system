import { z } from "zod"
import { OrganizationType } from "@prisma/client"

// Organization creation schema
export const organizationCreateSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  type: z.nativeEnum(OrganizationType, {
    errorMap: () => ({ message: "Please select a valid organization type" }),
  }),
  domain: z.string().optional(),
})

export type OrganizationCreateFormData = z.infer<typeof organizationCreateSchema>

// Organization update schema
export const organizationUpdateSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  domain: z.string().optional(),
})

export type OrganizationUpdateFormData = z.infer<typeof organizationUpdateSchema>

