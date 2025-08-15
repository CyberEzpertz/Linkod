import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormSwitchFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label: string;
  formDescription?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export function FormSwitchField<T extends FieldValues>({
  form,
  formKey,
  label,
  formDescription,
  className,
  disabled = false,
  onChange = () => {},
}: FormSwitchFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-x-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(val) => {
                  field.onChange(val);
                  onChange(val);
                }}
                disabled={disabled}
              />
            </FormControl>
          </div>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
