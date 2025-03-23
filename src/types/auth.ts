import { User } from "./user";

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  oauthProvider?: string;
  oauthId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OAuthLoginRequest {
  oauthToken: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}
