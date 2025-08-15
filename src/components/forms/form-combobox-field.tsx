import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, LucideMessageCircleQuestion } from "lucide-react";
import React from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FormCustomLabel } from "./form-custom-label";

interface FormFieldComboboxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  data?: { value: PathValue<T, Path<T>>; label: string }[];
  label?: string;
  formKey: Path<T>;
  selectMessage?: string;
  searchMessage?: string;
  formDescription?: string;
  disabled?: boolean;
  onSelect?: any;
  optional?: boolean;
  endIcon?: React.ReactNode;
  toolTip?: string;
  onChange?: (value: string) => void;
  className?: string;
  emptyMessage?: string;
  tight?: boolean;
  divClassName?: string;
}

export function FormComboboxField<T extends FieldValues>({
  form,
  data = [],
  label = "",
  formKey,
  selectMessage = "Please select an option...",
  searchMessage = "Search options...",
  formDescription,
  disabled = false,
  onSelect = () => {},
  endIcon,
  onChange,
  className = "",
  emptyMessage = "No data.",
  optional = false,
  tight = false,
  toolTip,
  divClassName,
}: FormFieldComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field }) => (
        <FormItem
          className={cn(
            `flex flex-col ${tight ? "space-y-0" : ""}`,
            divClassName
          )}
        >
          <div className="flex items-center space-x-2">
            {label && (
              <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
            )}
            {toolTip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LucideMessageCircleQuestion className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>[AI] {toolTip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger
              asChild
              disabled={disabled}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault();
                }
              }}
            >
              <FormControl>
                <div className="relative">
                  <Button
                    disabled={disabled}
                    variant="outline"
                    type="button"
                    role="combobox"
                    className={cn(
                      "flex w-full text-left font-normal",
                      !field.value && "text-muted-foreground",
                      className,
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">
                      {field.value
                        ? data.find(
                            (dataItem) => dataItem.value === field.value
                          )?.label
                        : selectMessage}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                  {endIcon && (
                    <div className="absolute bottom-[10px] right-2">
                      {endIcon}
                    </div>
                  )}
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder={searchMessage} className="h-9" />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {data.map((dataItem) => (
                      <CommandItem
                        key={dataItem.value}
                        value={dataItem.label}
                        onSelect={() => {
                          const value =
                            dataItem.value === field.value
                              ? ""
                              : dataItem.value;
                          form.setValue(
                            formKey,
                            value as PathValue<T, Path<T>>
                          );
                          field.onChange(value);
                          setOpen(false);
                          onSelect(dataItem);
                          // Call the onChange callback if provided
                          if (onChange) {
                            onChange(value);
                          }
                        }}
                      >
                        {dataItem.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === dataItem.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {formDescription && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
