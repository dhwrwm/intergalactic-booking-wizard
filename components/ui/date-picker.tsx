"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
  className?: string;
  error?: boolean;
  defaultMonth?: Date;
  disablePicker?: boolean;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  disabled,
  fromDate,
  toDate,
  className,
  error = false,
  defaultMonth,
  disablePicker,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disablePicker}
          className={cn(
            "w-full justify-start text-left font-normal text-white",
            !date && "text-slate-400",
            error && "border-red-500 focus:border-red-500",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
          defaultMonth={defaultMonth}
        />
      </PopoverContent>
    </Popover>
  );
}
