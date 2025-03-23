export interface BusStop {
  id: string;
  routeId: string;
  name: string;
  latitude: number;
  longitude: number;
  busLeft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusStopRequest {
  routeId: string;
  name: string;
  latitude: number;
  longitude: number;
  busLeft?: boolean;
}

export interface UpdateBusStopRequest {
  name?: string;
  latitude?: number;
  longitude?: number;
  busLeft?: boolean;
}
