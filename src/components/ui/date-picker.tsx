"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date | null;
  placeholder?: string;
  onChange: (value: Date | null) => void;
}

export function DatePicker({
  value = null,
  placeholder = "Pick a date",
  onChange,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const date = value ? new Date(value) : undefined;

  const setDate = (date?: Date) => {
    onChange(date ?? null);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !!date && "pr-11"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-muted-foreground">{placeholder}</span>
            {date && <span className="ml-2">{format(date, "dd MMM ’yy")}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-0"
          onClick={() => setDate()}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
