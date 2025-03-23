// Organization Types
export enum OrganizationType {
  COMPANY = "COMPANY",
  EVENT = "EVENT",
}

export interface Organization {
  id: string
  name: string
  type: OrganizationType
  domain?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrganizationRequest {
  name: string
  type: OrganizationType
  domain?: string
}

export interface UpdateOrganizationRequest {
  name?: string
  domain?: string
}

// User Types
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ORG_ADMIN = "ORG_ADMIN",
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  createdAt: string
  updatedAt: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
  oauthProvider?: string
  oauthId?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface OAuthLoginRequest {
  oauthToken: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface UpdateUserRequest {
  name?: string
  role?: UserRole
}

export interface UpdateUserOrganizationRequest {
  organizationId: string
}

export interface UpdatePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  code: string
  newPassword: string
}

// Route Types
export interface Route {
  id: string
  organizationId: string
  name: string
  description: string
  code: string
  logo?: string
  createdAt: string
  updatedAt: string
  buses?: Bus[]
  busStops?: BusStop[]
  passengers?: Passenger[]
}

export interface CreateRouteRequest {
  organizationId: string
  name: string
  description: string
  code?: string
  logo?: string
}

export interface UpdateRouteRequest {
  name?: string
  description?: string
  logo?: string
}

// Bus Types
export enum BusStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Bus {
  id: string
  routeId: string
  name: string
  plateNumber: string
  capacity: number
  status: BusStatus
  locationLatitude?: number
  locationLongitude?: number
  createdAt: string
  updatedAt: string
}

export interface CreateBusRequest {
  routeId: string
  name: string
  plateNumber: string
  capacity: number
  status: BusStatus
  locationLatitude?: number
  locationLongitude?: number
}

export interface UpdateBusRequest {
  name?: string
  plateNumber?: string
  capacity?: number
  status?: BusStatus
  locationLatitude?: number
  locationLongitude?: number
}

// Bus Stop Types
export interface BusStop {
  id: string
  routeId: string
  name: string
  latitude: number
  longitude: number
  busLeft: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateBusStopRequest {
  routeId: string
  name: string
  latitude: number
  longitude: number
  busLeft?: boolean
}

export interface UpdateBusStopRequest {
  name?: string
  latitude?: number
  longitude?: number
  busLeft?: boolean
}

// Passenger Types
export enum PassengerStatus {
  WAITING = "WAITING",
  BOARDED = "BOARDED",
  LEFT = "LEFT",
}

export interface Passenger {
  id: string
  routeId: string
  busId?: string
  nickname: string
  status: PassengerStatus
  waitingLatitude?: number
  waitingLongitude?: number
  onboardLatitude?: number
  onboardLongitude?: number
  createdAt: string
  updatedAt: string
}

export interface CreatePassengerRequest {
  routeId: string
  busId?: string
  nickname: string
  status?: PassengerStatus
  waitingLatitude?: number
  waitingLongitude?: number
}

export interface UpdatePassengerRequest {
  busId?: string
  status?: PassengerStatus
  waitingLatitude?: number
  waitingLongitude?: number
  onboardLatitude?: number
  onboardLongitude?: number
}

// Live Tracking Types
export interface BusLiveTracking {
  id: string
  busId: string
  routeId: string
  passengerId: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}

export interface CreateLiveTrackingRequest {
  busId: string
  routeId: string
  passengerId: string
  latitude: number
  longitude: number
}

