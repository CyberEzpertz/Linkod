import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface FormCheckboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label: string;
  formDescription?: string;
  options: Array<{
    id: number;
    label: string;
    value: any;
  }>;
}

export function FormCheckboxField<T extends FieldValues>({
  form,
  formKey,
  label,
  formDescription,
  options,
}: FormCheckboxFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={formKey}
      render={() => (
        <FormItem className="mb-2">
          <div className="mb-4">
            <FormLabel className="text-sm">{label}</FormLabel>
          </div>
          {options.map((option) => (
            <FormField
              key={option.id}
              control={form.control}
              name={formKey}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const val = field.value || [];
                        return checked
                          ? field.onChange([...val, option.value])
                          : field.onChange(
                              val?.filter(
                                (value: any) => value !== option.value
                              )
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="ml-2 text-sm font-normal">
                    {option.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}

          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
