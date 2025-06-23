import type { RootState } from '../../app/store';

export const selectToken = (s: RootState) => s.auth.token;
export const selectRoles = (s: RootState) => s.auth.roles;

export const hasRole =
  (role: string) =>
  (s: RootState) =>
    s.auth.roles.includes(role);
