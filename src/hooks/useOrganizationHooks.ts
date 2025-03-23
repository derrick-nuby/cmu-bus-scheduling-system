import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from "@/services/organizationService"
import type { CreateOrganizationRequest, UpdateOrganizationRequest } from "@/types"

export const useGetOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(),
  })
}

export const useGetOrganization = (id: string) => {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganization(id),
    enabled: !!id,
  })
}

export const useCreateOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrganizationRequest) => createOrganization(data),
    onSuccess: () => {
      toast.success("Organization created successfully")
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create organization")
    },
  })
}

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationRequest }) => updateOrganization(id, data),
    onSuccess: (_, variables) => {
      toast.success("Organization updated successfully")
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      queryClient.invalidateQueries({ queryKey: ["organizations", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update organization")
    },
  })
}

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteOrganization(id),
    onSuccess: () => {
      toast.success("Organization deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete organization")
    },
  })
}

