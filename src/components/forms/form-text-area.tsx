import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormCustomLabel } from "./form-custom-label";

type TextareaProps = Omit<ComponentProps<"textarea">, "form">;

interface FormTextAreaProps<T extends FieldValues> extends TextareaProps {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  formDescription?: string;
  disabled?: boolean;
  optional?: boolean;
  endIcon?: React.ReactNode;
}

export function FormTextArea<T extends FieldValues>({
  form,
  formKey,
  label,
  formDescription,
  disabled = false,
  optional = false,
  endIcon,
  className,
  ...textAreaProps
}: FormTextAreaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem>
          {label && (
            <div className="flex items-center space-x-2">
              <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
            </div>
          )}
          <FormControl>
            <div className="relative">
              <textarea
                className={cn(
                  "flex min-h-[100px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  className
                )}
                disabled={disabled}
                {...field}
                {...textAreaProps}
              />
              {endIcon && (
                <div className="absolute bottom-[10px] right-2">{endIcon}</div>
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
  );
}
