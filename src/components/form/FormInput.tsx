"use client";

import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Input, InputProps } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: ReactNode;
  inputProps?: InputProps;
}
export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  inputProps,
}: Props<T>) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
