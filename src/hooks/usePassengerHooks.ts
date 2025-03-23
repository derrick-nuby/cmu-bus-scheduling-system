import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  getPassengers,
  getPassenger,
  createPassenger,
  updatePassenger,
  deletePassenger,
} from "@/services/passengerService"
import type { CreatePassengerRequest, UpdatePassengerRequest } from "@/types"

export const useGetPassengers = (routeId?: string, busId?: string) => {
  return useQuery({
    queryKey: ["passengers", { routeId, busId }],
    queryFn: () => getPassengers(routeId, busId),
  })
}

export const useGetPassenger = (id: string) => {
  return useQuery({
    queryKey: ["passengers", id],
    queryFn: () => getPassenger(id),
    enabled: !!id,
  })
}

export const useCreatePassenger = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePassengerRequest) => createPassenger(data),
    onSuccess: (data) => {
      toast.success("Passenger created successfully")
      queryClient.invalidateQueries({ queryKey: ["passengers"] })
      queryClient.invalidateQueries({ queryKey: ["passengers", { routeId: data.routeId }] })
      if (data.busId) {
        queryClient.invalidateQueries({ queryKey: ["passengers", { busId: data.busId }] })
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create passenger")
    },
  })
}

export const useUpdatePassenger = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePassengerRequest }) => updatePassenger(id, data),
    onSuccess: (_, variables) => {
      toast.success("Passenger updated successfully")
      queryClient.invalidateQueries({ queryKey: ["passengers"] })
      queryClient.invalidateQueries({ queryKey: ["passengers", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update passenger")
    },
  })
}

export const useDeletePassenger = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePassenger(id),
    onSuccess: () => {
      toast.success("Passenger deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["passengers"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete passenger")
    },
  })
}

