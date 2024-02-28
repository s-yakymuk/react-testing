"use client";

import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { Textarea, TextareaProps } from "../ui/textarea";
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
  textareaProps?: TextareaProps;
}
export default function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  textareaProps,
}: Props<T>) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} {...textareaProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
