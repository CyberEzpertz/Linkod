import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormCustomLabel } from "./form-custom-label";

interface FormTiptapFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  formDescription?: string;
  placeholder?: string;
  className?: string;
  divClassName?: string;
  disabled?: boolean;
  optional?: boolean;
  tight?: boolean;
  editorContentClassName?: string;
  autofocus?: boolean;
}

export function FormTiptapField<T extends FieldValues>({
  form,
  formKey,
  label = "",
  formDescription,
  placeholder,
  className,
  divClassName,
  disabled = false,
  optional = false,
  tight = false,
  editorContentClassName,
  autofocus = false,
}: FormTiptapFieldProps<T>) {
  return (
    <div className={cn("relative", divClassName)}>
      <FormField
        control={form.control}
        name={formKey}
        render={({ field }) => (
          <FormItem className={`${className} ${tight ? "space-y-0" : ""}`}>
            <div className="flex items-center space-x-2">
              <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
            </div>
            <FormControl>
              <div className="relative">
                <MinimalTiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  className={cn(
                    "w-full",
                    {
                      "border-destructive focus-within:border-destructive":
                        form.formState.errors.description,
                    },
                    className
                  )}
                  editorContentClassName={cn(
                    "[&_.ProseMirror]:min-h-[200px]",
                    editorContentClassName
                  )}
                  output="html"
                  placeholder={placeholder}
                  autofocus={autofocus}
                  editable={!disabled}
                />
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
