import * as z from 'zod';

export const AddUserSchema = z.object({
    name: z.string({ required_error: 'Vui lòng điền tên' }).min(1, { message: 'Vui lòng điền tên' }),
    email: z.string({ required_error: 'Vui lòng điền email' }).min(1, { message: 'Vui lòng điền email' }),
    password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
    avatar: z.any().optional(),
    gender: z.any(),
    roleId: z.any(),
});

export type AddUserSchemaType = z.infer<typeof AddUserSchema>;