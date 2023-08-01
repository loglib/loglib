export const ROLE = {
  owner: "owner",
  admin: "admin",
  viewer: "viewer",
} as const;
export type ROLE = typeof ROLE[keyof typeof ROLE];
export const INVITE_STATUS = {
  sent: "sent",
  accepted: "accepted",
  expired: "expired",
} as const;
export type INVITE_STATUS = typeof INVITE_STATUS[keyof typeof INVITE_STATUS];
