import { IRole } from "./role-permission-type";

export interface IUser {
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    id: number;
    name: string;
    email: string;
    avatar: string;
    gender: 0 | 1;
    role: IRole;
}

export interface IAddUser {
    name: string;
    avatar?: string;
    gender?: number;
    email: string;
    password: string;
    roleId?: number;
}