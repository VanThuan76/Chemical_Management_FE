'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Card, CardBody, CardHeader, Image, Button, Checkbox, Divider, Avatar } from "@nextui-org/react";
import { SignInSchema, SignInSchemaType } from "@/server/data/validations/auth";
import { useLogin } from "@/server/actions/auth-action";
import InputEmail from "@/components/common/form/input-email";
import InputPassword from "@/components/common/form/input-password";

const LoginPage = () => {
    const form = useForm<SignInSchemaType>({ resolver: zodResolver(SignInSchema) })

    const doLogin = useLogin()
    const onSubmit = form.handleSubmit((data) => {
        doLogin.mutate(data)
    })

    return (
        <section className='relative h-full flex-col items-center justify-center md:grid md:grid-cols-2'>
            <div className='hidden md:block relative bg-muted w-full h-full'>
                <div className='absolute inset-0 bg-[url("/bg_cover_login.jpg")] bg-cover bg-center bg-no-repeat overflow-hidden' />
                <div className="absolute max-w-md top-5 left-5 flex flex-col justify-start items-start gap-5 bg-white p-2 rounded-md shadow-md">
                    <div className="flex justify-start items-center gap-3">
                        <Avatar src="./lavoisier.jpeg" size="md" isBordered color="primary" className="bg-contain" />
                        <div className="flex flex-col -gap-3">
                            <p>Antoine Lavoisier(1743 - 1794)</p>
                            <span className="text-xs text-slate-500">Cha đẻ của hóa học hiện đại</span>
                        </div>
                    </div>
                    <p className="italic text-xl">&ldquo;Không có gì mất đi, không có gì được tạo ra, tất cả chỉ thay đổi hình dạng&rdquo;</p>
                </div>
                <div className='absolute bottom-5 left-5 z-20 bg-white px-2 py-1 rounded-md'>
                    <small>© Copyright {new Date().getFullYear()} Austin Vu</small>
                </div>
            </div>
            <Card
                isBlurred
                className="w-full h-full border-none bg-background/60 dark:bg-default-100/50 rounded-none px-2 md:px-12 py-24 my-auto"
                shadow="sm"
            >
                <CardHeader className="flex flex-col justify-center items-center gap-3">
                    <Image
                        alt="Background login"
                        className="object-cover"
                        shadow="md"
                        src="./logo_full.png"
                        width={100}
                        height={100}
                    />
                    <h3 className="text-base font-medium">Chào mừng bạn trở lại👋</h3>
                    <p className="text-xs">Đăng nhập để tiếp tục</p>
                </CardHeader>
                <CardBody>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <h1 className="text-lg md:hidden">Hệ thống quản lý hoá chất🧪🌡️</h1>
                        <Divider className="w-full md:w-[70%]" />
                        <form
                            onSubmit={onSubmit}
                            onError={e => {
                                new Error(`Error ${e}`);
                            }}
                            className='md:w-[70%] w-full h-full space-y-10 pt-3'
                        >
                            <InputEmail form={form} />
                            <InputPassword form={form} />
                            <div className="w-full flex items-center justify-between">
                                <Checkbox defaultSelected size="sm">Ghi nhớ mật khẩu</Checkbox>
                                <p className="hover:underline text-xs cursor-pointer">Quên mật khẩu?</p>
                            </div>
                            <Button type="submit" color="primary" className="w-full">
                                Đăng nhập
                            </Button>
                        </form>
                    </div>
                </CardBody>
            </Card>
            <div className="absolute bottom-5 left-[7%] md:left-[52%] flex flex-wrap justify-start items-start gap-5">
                <small>Chính sách quyền riêng tư</small>
                <small>Các điều khoản và điều kiện</small>
            </div>
        </section>
    );
}
export default LoginPage;
