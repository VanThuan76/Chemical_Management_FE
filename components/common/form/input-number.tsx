'use client'
import React from "react";
import { Input } from "@nextui-org/react";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputNumberProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
}

const InputNumber = <T extends FieldValues>({ form, name, label, placeholder }: InputNumberProps<T>) => {
    const { register, formState: { errors } } = form;

    return (
        <Input
            {...register(name)}
            isRequired
            labelPlacement="outside"
            size='md'
            type="number"
            label={label}
            placeholder={placeholder}
            isInvalid={(errors as FieldErrors<T>)[name] ? true : false}
            errorMessage={(errors as FieldErrors<T>)[name]?.message?.toString()}
            autoComplete="off"
        />
    );
}

export default InputNumber;
