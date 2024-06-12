import * as z from 'zod';

export const AddRoleSchema = z.object({
    name: z.string({ required_error: 'Vui lòng điền tên' }).min(1, { message: 'Vui lòng điền tên' }),
});

export type AddRoleSchemaType = z.infer<typeof AddRoleSchema>;