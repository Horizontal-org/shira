export interface UserSpaceContext {
  space: {
    id: number
    name: string
    organizationId: number
  }
  spaceRole: string
  organization: {
    id: number
    name: string
  }
  organizationRole: string
}

export interface UserOrganizationContext {
  organization: {
    id: number
    name: string
  }
  organizationRole: string
}

export interface IUserContextService {
  validateUserSpaceAccess(userId: number, spaceId: number): Promise<UserSpaceContext>;
  validateUserOrganizationAccess(userId: number, organizationId: number): Promise<UserOrganizationContext>;
}
