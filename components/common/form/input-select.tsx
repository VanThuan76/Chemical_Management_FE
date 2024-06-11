'use client'
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { FieldValues, UseFormReturn, Path, FieldErrors } from "react-hook-form";

interface InputSelectProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    options: { key: string | number; label: string }[];
}

const InputSelect = <T extends FieldValues>({ form, name, label, placeholder, options }: InputSelectProps<T>) => {
    const { register, setValue, formState: { errors } } = form;

    React.useEffect(() => {
        register(name);
    }, [register, name]);

    const handleChange = (value: any) => {
        setValue(name, value, { shouldValidate: true });
    };

    return (
        <Select
            label={label}
            placeholder={placeholder}
            labelPlacement="outside"
            className="max-w-xs"
            disableSelectorIconRotation
            onChange={(e) => handleChange(e.target.value)}
            isInvalid={(errors as FieldErrors<T>)[name] ? true : false}
            errorMessage={(errors as FieldErrors<T>)[name]?.message?.toString()}
        >
            {options.map(option => (
                <SelectItem key={option.key} value={option.key}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    );
};

export default InputSelect;
