import * as z from 'zod';

export const SignInSchema = z.object({
    email: z.string({ required_error: 'Vui lòng điền tên đăng nhập' }).min(1, { message: 'Vui lòng điền tên đăng nhập' }),
    password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
    save_password: z.boolean().optional(),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;