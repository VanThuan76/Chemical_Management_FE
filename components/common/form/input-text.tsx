'use client'
import React from "react";
import { Input } from "@nextui-org/react";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputTextProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
}

const InputText = <T extends FieldValues>({ form, name, label, placeholder }: InputTextProps<T>) => {
    const { register, formState: { errors } } = form;

    return (
        <Input
            {...register(name)}
            isRequired
            labelPlacement="outside"
            size='md'
            type="text"
            label={label}
            placeholder={placeholder}
            isInvalid={(errors as FieldErrors<T>)[name] ? true : false}
            errorMessage={(errors as FieldErrors<T>)[name]?.message?.toString()}
            autoComplete="off"
        />
    );
}

export default InputText;
