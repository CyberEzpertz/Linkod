import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";

interface FormSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: Array<{
    id?: number;
    label: string;
    value: string;
  }>;
  className?: string;
  disabled?: boolean;
  onChange?: (val: string) => void;
}

export function FormSelectField<T extends FieldValues>({
  form,
  formKey,
  label = "",
  description,
  placeholder,
  options,
  className,
  disabled = false,
  onChange = () => {},
}: FormSelectFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel htmlFor={formKey}>{label}</FormLabel>}
          <FormControl>
            <MultiSelect
              options={options}
              selected={field.value}
              onChange={field.onChange}
              placeholder="Select frameworks..."
              emptyText="No frameworks found."
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
