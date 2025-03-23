import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { signup, login, oauthLogin, forgotPassword, resetPassword, logout } from "@/services/authService"
import type {
  SignupRequest,
  LoginRequest,
  OAuthLoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types"

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: () => {
      toast.success("Account created successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account")
    },
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: () => {
      toast.success("Logged in successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to log in")
    },
  })
}

export const useOAuthLogin = () => {
  return useMutation({
    mutationFn: (data: OAuthLoginRequest) => oauthLogin(data),
    onSuccess: () => {
      toast.success("Logged in successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to log in with OAuth")
    },
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to process forgot password request")
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password")
    },
  })
}

export const useLogout = () => {
  return () => {
    logout()
    toast.success("Logged out successfully")
  }
}

