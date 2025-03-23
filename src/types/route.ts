import type { Bus, BusStop, Passenger } from './index';

export interface Route {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  code: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
  buses?: Bus[];
  busStops?: BusStop[];
  passengers?: Passenger[];
}

export interface CreateRouteRequest {
  organizationId: string;
  name: string;
  description: string;
  code?: string;
  logo?: string;
}

export interface UpdateRouteRequest {
  name?: string;
  description?: string;
  logo?: string;
}
