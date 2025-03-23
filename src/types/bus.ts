export enum BusStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Bus {
  id: string;
  routeId: string;
  name: string;
  plateNumber: string;
  capacity: number;
  status: BusStatus;
  locationLatitude?: number;
  locationLongitude?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusRequest {
  routeId: string;
  name: string;
  plateNumber: string;
  capacity: number;
  status: BusStatus;
  locationLatitude?: number;
  locationLongitude?: number;
}

export interface UpdateBusRequest {
  name?: string;
  plateNumber?: string;
  capacity?: number;
  status?: BusStatus;
  locationLatitude?: number;
  locationLongitude?: number;
}
