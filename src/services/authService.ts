import axiosInstance from "@/lib/axiosConfig"
import { handleAxiosError } from "@/lib/errorHandler"
import type {
  SignupRequest,
  LoginRequest,
  OAuthLoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from "@/types"

export const signup = async (data: SignupRequest): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>("/users/signup", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to sign up"))
  }
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/users/login", data)

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }

    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to log in"))
  }
}

export const oauthLogin = async (data: OAuthLoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/users/login", data)

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }

    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to log in with OAuth"))
  }
}

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>("/users/forgot-password", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to process forgot password request"))
  }
}

export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>("/users/reset-password", data)
    return response.data
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to reset password"))
  }
}

export const logout = (): void => {
  localStorage.removeItem("token")
}

