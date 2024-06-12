export interface ICustomer {
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    id: number;
    name: string;
    email: string;
    phone_number: null | string;
    birthday: string;
    address: string;
    type: number;
    orders: any[];
}
export interface IAddCustomer {
    name: string;
    email: string;
    phone_number: string | number;
    birthday: string;
    address: string;
    type?: any;
}