"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { FormCustomLabel } from "./form-custom-label";

interface FormDropZoneFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  formKey: Path<T>;
  label?: string;
  formDescription?: string;
  disabled?: boolean;
  optional?: boolean;
  className?: string;
  acceptedTypes?: string[];
}

const DEFAULT_ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "text/plain",
];

export function FormDropZoneField<T extends FieldValues>({
  form,
  formKey,
  label,
  formDescription,
  disabled = false,
  optional = false,
  className,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
}: FormDropZoneFieldProps<T>) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const file = form.watch(formKey) as File | null;

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && acceptedTypes.includes(droppedFile.type)) {
        form.setValue(formKey, droppedFile as PathValue<T, Path<T>>, {
          shouldValidate: true,
        });
      } else {
        form.setError(formKey, {
          message: "Please drop a valid file (PDF, DOCX, or TXT).",
        });
      }
    },
    [acceptedTypes, form, formKey]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile && acceptedTypes.includes(selectedFile.type)) {
        form.setValue(formKey, selectedFile as PathValue<T, Path<T>>, {
          shouldValidate: true,
        });
      } else {
        form.setError(formKey, {
          message: "Please select a valid file (PDF, DOCX, or TXT).",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [acceptedTypes, form, formKey]
  );

  return (
    <FormField
      control={form.control}
      name={formKey}
      render={() => (
        <FormItem>
          {label && (
            <FormCustomLabel optional={optional}>{label}</FormCustomLabel>
          )}
          <FormControl>
            <div
              className={cn(
                "cursor-pointer rounded-lg border-2 border-dashed p-8 py-12 text-center transition-all duration-300",
                isDragging
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-input hover:border-primary/50 hover:bg-accent",
                className
              )}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !disabled && fileInputRef.current?.click()}
            >
              <Input
                type="file"
                accept={acceptedTypes.join(",")}
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled}
              />
              <div className="flex cursor-pointer flex-row items-center justify-center gap-4">
                <UploadCloud
                  className={cn("size-20 transition-colors duration-300", {
                    "text-primary": isDragging || file,
                    "text-muted-foreground": !isDragging && !file,
                  })}
                  strokeWidth={1.5}
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold">Upload File</h3>
                  <p
                    className={cn(
                      "font-semibold transition-colors duration-300",
                      {
                        "text-primary": isDragging,
                        "text-muted-foreground": !isDragging,
                      }
                    )}
                  >
                    {file
                      ? `Selected: ${file.name}`
                      : "Drag & drop your file here, or click to select"}
                  </p>
                  <p
                    className={cn("text-sm transition-colors duration-300", {
                      "text-primary": isDragging,
                      "text-muted-foreground": !isDragging,
                    })}
                  >
                    Supported file types: pdf, docx, txt
                  </p>
                </div>
              </div>
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
