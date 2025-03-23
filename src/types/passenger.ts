export enum PassengerStatus {
  WAITING = "WAITING",
  BOARDED = "BOARDED",
  LEFT = "LEFT",
}

export interface Passenger {
  id: string;
  routeId: string;
  busId?: string;
  nickname: string;
  status: PassengerStatus;
  waitingLatitude?: number;
  waitingLongitude?: number;
  onboardLatitude?: number;
  onboardLongitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePassengerRequest {
  routeId: string;
  busId?: string;
  nickname: string;
  status?: PassengerStatus;
  waitingLatitude?: number;
  waitingLongitude?: number;
}

export interface UpdatePassengerRequest {
  busId?: string;
  status?: PassengerStatus;
  waitingLatitude?: number;
  waitingLongitude?: number;
  onboardLatitude?: number;
  onboardLongitude?: number;
}
