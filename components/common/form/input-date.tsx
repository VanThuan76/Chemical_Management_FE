'use client'
import React from "react";
import { DateInput } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputDateProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
}

const InputDate = <T extends FieldValues>({ form, name, label, placeholder }: InputDateProps<T>) => {
    const { setValue, register, formState: { errors } } = form;

    const handleDateChange = (value: any) => {
        setValue(name as Path<T>, value);
    };

    return (
        <DateInput
            {...register(name as Path<T>)}
            label={label}
            placeholderValue={new CalendarDate(1995, 11, 6)}
            description={placeholder}
            isRequired
            labelPlacement="outside"
            size="md"
            onChange={handleDateChange}
            isInvalid={(errors as FieldErrors<T>).birthDate ? true : false}
            errorMessage={(errors as FieldErrors<T>).birthDate?.message?.toString()}
        />
    );
}

export default InputDate;
