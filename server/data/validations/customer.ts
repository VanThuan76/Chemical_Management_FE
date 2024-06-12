import * as z from 'zod';

export const AddCustomerSchema = z.object({
    name: z.string({ required_error: 'Vui lòng điền tên' }).min(1, { message: 'Vui lòng điền tên' }),
    email: z.string({ required_error: 'Vui lòng điền email' }).min(1, { message: 'Vui lòng điền email' }),
    birthday: z.string({ required_error: 'Vui lòng điền ngày sinh' }),
    phone_number: z.string({ required_error: 'Vui lòng điền sđt' }).min(1, { message: 'Vui lòng điền sđt' }),
    address: z.string({ required_error: 'Vui lòng điền địa chỉ' }).min(1, { message: 'Vui lòng điền địa chỉ' }),
    type: z.any(),
});

export type AddCustomerSchemaType = z.infer<typeof AddCustomerSchema>;