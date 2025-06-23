// src/api/employeeApi.ts
import { api } from "../app/axios";

export const employeeApi = {
    list: () => api.get('/employees').then(r => r.data),
    updateRoles: (id: number, rs: string[]) =>
        api.patch(`/employees/${id}/roles`, { roles: rs }),
    clockIn: () => api.post('/employees/clock-in'),
    clockOut: () => api.post('/employees/clock-out'),
    hours: (id: number, f: string, t: string) =>
        api.get('/employees/time/summary', { params: { user: id, from: f, to: t } }).then(r => r.data),
};
