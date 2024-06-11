'use client'
import React from "react";
import { Input } from "@nextui-org/react";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputEmailProps<T extends FieldValues> {
    form: UseFormReturn<T>;
}

const InputEmail = <T extends FieldValues>({ form }: InputEmailProps<T>) => {
    const { register, formState: { errors } } = form;

    return (
        <Input
            {...register("email" as Path<T>)}
            isRequired
            labelPlacement="outside"
            size='md'
            type="email"
            label="Email"
            placeholder="chemical@gmail.com"
            isInvalid={(errors as FieldErrors<T>).email ? true : false}
            errorMessage={(errors as FieldErrors<T>).email?.message?.toString()}
            autoComplete="off"
        />
    );
}

export default InputEmail;
