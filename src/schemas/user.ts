import { z } from "zod"
import { UserRole } from "@prisma/client"

// User update schema
export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
})

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>

// User organization update schema
export const userOrganizationSchema = z.object({
  organizationId: z.string().min(1, "Organization is required"),
})

export type UserOrganizationFormData = z.infer<typeof userOrganizationSchema>

