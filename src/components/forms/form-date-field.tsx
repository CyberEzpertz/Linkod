import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FormDateFieldProps<T extends FieldValues>
  extends Omit<React.ComponentProps<"button">, "form"> {
  form: UseFormReturn<T>;
  label?: string;
  formKey: Path<T>;
  formDescription?: string;
  onValueChange?: (value: string) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  divClassName?: string;
}
export default function FormDateField<T extends FieldValues>({
  form,
  label,
  formKey,
  formDescription,
  onValueChange = () => {},
  rangeStart,
  rangeEnd,
  className,
  divClassName,
  ...props
}: FormDateFieldProps<T>) {
  return (
    <div className={cn("relative", divClassName)}>
      <FormField
        control={form.control}
        name={formKey}
        render={({ field }) => (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={form.formState.isSubmitting}
                    {...props}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > (rangeEnd ?? new Date("3000-01-01")) ||
                    date < (rangeStart ?? new Date("1900-01-01"))
                  }
                />
              </PopoverContent>
            </Popover>
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
