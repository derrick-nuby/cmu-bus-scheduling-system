export interface BusLiveTracking {
  id: string;
  busId: string;
  routeId: string;
  passengerId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLiveTrackingRequest {
  busId: string;
  routeId: string;
  passengerId: string;
  latitude: number;
  longitude: number;
}
