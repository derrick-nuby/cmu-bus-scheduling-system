export enum OrganizationType {
  COMPANY = "COMPANY",
  EVENT = "EVENT",
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  domain?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationRequest {
  name: string;
  type: OrganizationType;
  domain?: string;
}

export interface UpdateOrganizationRequest {
  name?: string;
  domain?: string;
}
