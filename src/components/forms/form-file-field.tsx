import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useCallback, useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormCustomLabel } from "./form-custom-label";

type FormFileFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  formDescription?: string;
  disabled?: boolean;
  optional?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onProcessFile?: (file: File) => Promise<void>;
  className?: string;
};

export function FormFileField<T extends FieldValues>({
  form,
  formKey,
  label,
  formDescription,
  disabled = false,
  optional = false,
  accept,
  maxSize = 5, // Default 5MB
  onProcessFile,
  className,
}: FormFileFieldProps<T>) {
  const [isProcessing, setIsProcessing] = useState(false);
  const file = form.watch(formKey) as File | null;

  const handleFileChange = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const newFile = fileList[0];
      if (newFile.size > maxSize * 1024 * 1024) {
        form.setError(formKey, {
          message: `File size must be less than ${maxSize}MB`,
        });
        return;
      }

      form.setValue(formKey, newFile as unknown as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });

      if (onProcessFile) {
        setIsProcessing(true);
        try {
          await onProcessFile(newFile);
        } catch (error) {
          form.setError(formKey, {
            message: "Error processing file",
          });
        }
        setIsProcessing(false);
      }

      form.setValue(formKey, newFile as unknown as PathValue<T, Path<T>>, {
        shouldValidate: true,
      });
    },
    [form, formKey, maxSize, onProcessFile]
  );

  const removeFile = useCallback(() => {
    form.setValue(formKey, null as unknown as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
  }, [form, formKey]);

  const openFileDialog = useCallback(() => {
    if (disabled) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept || "";
    input.multiple = false;
    input.onchange = (e) =>
      handleFileChange((e.target as HTMLInputElement).files);
    input.click();
  }, [accept, disabled, handleFileChange]);

  return (
    <FormField
      control={form.control}
      name={formKey}
      render={({ field: { ref, ...field } }) => (
        <FormItem>
          {label && (
            <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
          )}
          <FormControl>
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "relative h-32 w-full border-dashed",
                  isProcessing && "pointer-events-none opacity-50",
                  className
                )}
                onClick={openFileDialog}
                disabled={disabled}
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {file ? (
                      <>
                        <span className="text-sm">{file.name}</span>
                        <span className="text-muted-foreground text-xs">
                          Click to browse
                        </span>
                        <span
                          className="bg-background hover:bg-muted absolute top-2 right-2 cursor-pointer rounded-full border p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-muted-foreground h-6 w-6" />
                        <span className="text-muted-foreground">
                          Click to browse
                        </span>
                      </>
                    )}
                  </div>
                )}
              </Button>
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
