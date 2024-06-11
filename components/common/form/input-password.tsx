'use client'
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@nextui-org/react";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputPasswordProps<T extends FieldValues> {
    form: UseFormReturn<T>;
}

const InputPassword = <T extends FieldValues>({ form }: InputPasswordProps<T>) => {
    const { register, formState: { errors } } = form;
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            {...register("password" as Path<T>)}
            isRequired
            labelPlacement="outside"
            size='md'
            label="Mật khẩu"
            placeholder="*******"
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <Eye className="w-[18px] h-[18px] text-default-400 pointer-events-none" />
                    ) : (
                        <EyeOff className="w-[18px] h-[18px] text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            isInvalid={(errors as FieldErrors<T>).password ? true : false}
            errorMessage={(errors as FieldErrors<T>).password?.message?.toString()}
            autoComplete="off"
        />
    );
}

export default InputPassword;
