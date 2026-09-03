export const ORGANIZATION_TYPES = [
  'business',
  'cibersecurity',
  'non-profit',
  'individual',
  'educational',
  'healthcare',
] as const;

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number];
