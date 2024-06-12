export interface IRole {
    created_at: string;
    updated_at: string;
    created_by: null;
    updated_by: null;
    id: number;
    name: string;
    slug: string;
    permissions: Permission[];
}
export interface IAddRole {
    name: string
}
interface Permission {
    id: number;
    table_key: string;
    is_read: number;
    is_create: number;
    is_update: number;
    is_delete: number;
    is_manage: number;
}