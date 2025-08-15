"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormCustomLabel } from "./form-custom-label";

interface FormTextFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  formDescription?: string;
  placeholder?: string;
  className?: string;
  divClassName?: string;
  inputType?: "text" | "number" | "password" | "email";
  disabled?: boolean;
  endIcon?: ReactNode;
  optional?: boolean;
  tight?: boolean;
  onBlur?: any;
  onChange?: (value: string | number) => void;
  additionalLabel?: ReactNode;
  onEndIconClick?: () => void;
}

export function FormTextField<T extends FieldValues>({
  form,
  formKey,
  label = "",
  formDescription,
  placeholder,
  className,
  divClassName,
  inputType = "text",
  disabled,
  endIcon,
  optional = false,
  tight = false,
  onBlur = () => {},
  onChange,
  additionalLabel,
  onEndIconClick,
}: FormTextFieldProps<T>) {
  return (
    <div className={cn("relative", divClassName)}>
      <FormField
        control={form.control}
        name={formKey}
        render={({ field }) => (
          <FormItem className={`${className} ${tight ? "space-y-0" : ""}`}>
            <div className="flex items-center space-x-2">
              <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
              {additionalLabel}
            </div>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  onBlur={onBlur}
                  value={field.value ?? ""}
                  type={inputType}
                  disabled={disabled}
                  placeholder={placeholder ?? ""}
                  className={cn(className, "bg-background")}
                  onChange={(e) => {
                    let value: string | number = e.target.value;
                    if (inputType === "number") {
                      value =
                        e.target.value === "" ? "" : parseFloat(e.target.value);
                    }
                    field.onChange(value);
                    onChange?.(value);
                  }}
                />
                {endIcon && (
                  <div
                    className="absolute right-2 bottom-[10px]"
                    onClick={onEndIconClick}
                  >
                    {endIcon}
                  </div>
                )}
              </div>
            </FormControl>
            {formDescription && (
              <FormDescription>{formDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
