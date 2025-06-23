// src/api/employees.ts
import { api } from "../app/axios";

export interface EmployeeDto {
    id: number;
    email: string;
    roles: string[];
}

export const fetchEmployees = () =>
    api.get<EmployeeDto[]>('/employees').then(res => res.data);