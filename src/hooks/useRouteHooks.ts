import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getRoutes, getRoute, createRoute, updateRoute, deleteRoute } from "@/services/routeService"
import type { CreateRouteRequest, UpdateRouteRequest } from "@/types"

export const useGetRoutes = (organizationId?: string, code?: string) => {
  return useQuery({
    queryKey: ["routes", { organizationId, code }],
    queryFn: () => getRoutes(organizationId, code),
  })
}

export const useGetRoute = (id: string) => {
  return useQuery({
    queryKey: ["routes", id],
    queryFn: () => getRoute(id),
    enabled: !!id,
  })
}

export const useCreateRoute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRouteRequest) => createRoute(data),
    onSuccess: () => {
      toast.success("Route created successfully")
      queryClient.invalidateQueries({ queryKey: ["routes"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create route")
    },
  })
}

export const useUpdateRoute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRouteRequest }) => updateRoute(id, data),
    onSuccess: (_, variables) => {
      toast.success("Route updated successfully")
      queryClient.invalidateQueries({ queryKey: ["routes"] })
      queryClient.invalidateQueries({ queryKey: ["routes", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update route")
    },
  })
}

export const useDeleteRoute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteRoute(id),
    onSuccess: () => {
      toast.success("Route deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["routes"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete route")
    },
  })
}

