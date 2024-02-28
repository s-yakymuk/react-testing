"use client";

import { format } from "date-fns";
import { ReactNode, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar, CalendarProps } from "../ui/calendar";

import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  calendarProps?: CalendarProps;
}

export default function FormDatePicker<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
  placeholder = "Pick a date",
  calendarProps,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                {...calendarProps}
                mode="single"
                onSelect={(value) => {
                  field.onChange(
                    value ? value.toISOString().substring(0, 10) : null
                  );
                  setIsOpen(false);
                }}
                selected={field.value ? new Date(field.value) : undefined}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
