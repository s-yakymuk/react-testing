"use client";

import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
}

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  options?: CheckboxGroupOption[];
}
export default function FormCheckboxGroup<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
  options,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center flex-wrap gap-6">
              {options?.map((o) => (
                <div className="flex items-center space-x-2" key={o.value}>
                  <Checkbox
                    id={o.value.toString()}
                    disabled={disabled}
                    onCheckedChange={() => {
                      field.onChange(
                        field.value?.includes(o.value)
                          ? field.value.filter((v: string) => v !== o.value)
                          : [...field.value, o.value]
                      );
                    }}
                    checked={field.value?.includes(o.value)}
                  />
                  <label
                    htmlFor={o.value.toString()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {o.label}
                  </label>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
