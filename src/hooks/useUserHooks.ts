import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  getUsers,
  getUser,
  updateUser,
  updateUserOrganization,
  updatePassword,
  deleteUser,
} from "@/services/userService"
import type { UpdateUserRequest, UpdateUserOrganizationRequest, UpdatePasswordRequest } from "@/types"

export const useGetUsers = (organizationId?: string) => {
  return useQuery({
    queryKey: ["users", { organizationId }],
    queryFn: () => getUsers(organizationId),
  })
}

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => updateUser(id, data),
    onSuccess: (_, variables) => {
      toast.success("User updated successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user")
    },
  })
}

export const useUpdateUserOrganization = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserOrganizationRequest }) => updateUserOrganization(id, data),
    onSuccess: (_, variables) => {
      toast.success("User organization updated successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user organization")
    },
  })
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePasswordRequest }) => updatePassword(id, data),
    onSuccess: () => {
      toast.success("Password updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update password")
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user")
    },
  })
}

