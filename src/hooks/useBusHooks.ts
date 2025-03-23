import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { getBuses, getBus, createBus, updateBus, deleteBus } from "@/services/busService"
import type { CreateBusRequest, UpdateBusRequest } from "@/types"

export const useGetBuses = (routeId?: string) => {
  return useQuery({
    queryKey: ["buses", { routeId }],
    queryFn: () => getBuses(routeId),
  })
}

export const useGetBus = (id: string) => {
  return useQuery({
    queryKey: ["buses", id],
    queryFn: () => getBus(id),
    enabled: !!id,
  })
}

export const useCreateBus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBusRequest) => createBus(data),
    onSuccess: (data) => {
      toast.success("Bus created successfully")
      queryClient.invalidateQueries({ queryKey: ["buses"] })
      queryClient.invalidateQueries({ queryKey: ["buses", { routeId: data.routeId }] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create bus")
    },
  })
}

export const useUpdateBus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusRequest }) => updateBus(id, data),
    onSuccess: (_, variables) => {
      toast.success("Bus updated successfully")
      queryClient.invalidateQueries({ queryKey: ["buses"] })
      queryClient.invalidateQueries({ queryKey: ["buses", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update bus")
    },
  })
}

export const useDeleteBus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBus(id),
    onSuccess: () => {
      toast.success("Bus deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["buses"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete bus")
    },
  })
}

