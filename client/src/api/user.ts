
//client/src/api/user.ts
import { api } from "../app/axios";

export interface AccountInfo {
    email: string;
    createdAt: string;
    roles: string[];
}

export const getAccount = () => api.get<AccountInfo>('/auth/account');
