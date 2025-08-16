"use client";

import FormDateField from "@/components/forms/form-date-field";
import { FormSelectField } from "@/components/forms/form-select-field";
import { FormTextField } from "@/components/forms/form-text-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getLatestOcrData, parseOcrName } from "@/lib/ocr-autofill";
import { useRouter } from "next/navigation";
import React from "react";

const schema = z.object({
  surname: z.string().min(1, "Surname is required"),
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  address: z.string().min(1, "Address is required"),

  occupation: z.string().min(1, "Occupation is required"),
  tinNumber: z.string().optional(),
  biologicalSex: z.enum(["M", "F"]),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  placeOfBirth: z.string().min(1, "Place of Birth is required"),
  dateOfBirth: z
    .date()
    .max(new Date(), "Date of Birth cannot be in the future"),
  height: z.number().min(0, "Height must be positive"),
  weight: z.number().min(0, "Weight must be positive"),
  basicCommunityTax: z.number().min(0, "Basic Community Tax must be positive"),
  additionalCommunityTax: z
    .number()
    .min(0, "Additional Community Tax must be positive"),
  grossReceiptFromBusiness: z.number().min(0, "Gross Receipt must be positive"),
  salariesOfOccupationIncome: z.number().min(0, "Salaries must be positive"),
  rentalFromRealProperty: z.number().min(0, "Rental must be positive"),
});

type FormData = z.infer<typeof schema>;

export const CedulaClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  // Autofill from OCR if available
  const ocrData = typeof window !== "undefined" ? getLatestOcrData() : null;

  // Mapping from OCR fields to form fields (extend as OcrData grows)
  const ocrToFormMapping: {
    [K in "address" | "dob"]?: {
      formKey: keyof FormData | string;
      transform?: (val: any) => any;
    };
  } = {
    address: { formKey: "address" },
    dob: {
      formKey: "dateOfBirth",
      transform: (val: string) => {
        // Try to parse as date
        const d = new Date(val);
        return isNaN(d.getTime()) ? new Date() : d;
      },
    },
  };

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      ...(ocrData?.name
        ? parseOcrName(ocrData.name)
        : { surname: "", firstName: "", middleName: "" }),
      address: ocrData?.address || "",
      occupation: "",
      tinNumber: "",
      biologicalSex: "M",
      maritalStatus: "",
      placeOfBirth: "",
      dateOfBirth: ocrData?.dob
        ? (() => {
            const d = new Date(ocrData.dob);
            return isNaN(d.getTime()) ? new Date() : d;
          })()
        : new Date(),
      height: 0,
      weight: 0,
      basicCommunityTax: 0,
      additionalCommunityTax: 0,
      grossReceiptFromBusiness: 0,
      salariesOfOccupationIncome: 0,
      rentalFromRealProperty: 0,
    },
  });

  const { handleSubmit, reset, setValue, getValues } = form;

  // On mount, if OCR data exists, update form values for all mapped fields
  React.useEffect(() => {
    if (ocrData) {
      // Autofill name fields
      if (ocrData.name) {
        const { surname, firstName, middleName } = parseOcrName(ocrData.name);
        if (getValues("surname") === "") setValue("surname", surname);
        if (getValues("firstName") === "") setValue("firstName", firstName);
        if (getValues("middleName") === "") setValue("middleName", middleName);
      }
      // Autofill other mapped fields
      (
        Object.entries(ocrToFormMapping) as [
          keyof typeof ocrToFormMapping,
          { formKey: keyof FormData | string; transform?: (val: any) => any },
        ][]
      ).forEach(([ocrKey, { formKey, transform }]) => {
        const ocrValue = ocrData[ocrKey];
        if (
          ocrValue !== undefined &&
          ocrValue !== null &&
          ocrValue !== "" &&
          ((typeof formKey === "string" && getValues(formKey as any) === "") ||
            (typeof getValues(formKey as any) === "number" &&
              getValues(formKey as any) === 0) ||
            (formKey === "dateOfBirth" &&
              getValues("dateOfBirth") instanceof Date &&
              isNaN(getValues("dateOfBirth").getTime())))
        ) {
          setValue(formKey as any, transform ? transform(ocrValue) : ocrValue);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      toast.success("Form successfully submitted");
      router.push("/kiosk/services");
    }
  };

  // Common button styles for touch-friendly interaction
  const buttonClasses =
    "text-2xl px-12 py-6 rounded-xl shadow-md active:scale-95 transition-transform";

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center px-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "h-10 w-10 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary"
              )}
            />
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-2 w-32",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-2 p-8">
          <CardTitle className="text-4xl font-bold">
            Cedula Clearance Form
          </CardTitle>
          <CardDescription className="text-2xl">
            Step {step + 1} of {totalSteps}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            {step === 0 && (
              <form
                onSubmit={handleSubmit(onSubmit, () => {
                  toast.error("Please fill out all required fields");
                })}
                className="grid grid-cols-2 gap-x-8 gap-y-8"
              >
                <FormTextField
                  form={form}
                  formKey="surname"
                  label="Surname"
                  placeholder="Enter surname"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="middleName"
                  label="Middle Name"
                  placeholder="Enter middle name (optional)"
                  optional
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="address"
                  label="Address"
                  placeholder="Enter address"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="occupation"
                  label="Occupation"
                  placeholder="Enter occupation"
                  className="h-16 text-xl"
                />
                <div className="col-span-2 mt-8 flex justify-end gap-6">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                    className={buttonClasses}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep(step + 1)}
                    className={buttonClasses}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-x-8 gap-y-8"
              >
                <FormTextField
                  form={form}
                  formKey="tinNumber"
                  label="TIN #"
                  placeholder="Enter TIN # (optional)"
                  optional
                  className="h-16 text-xl"
                />
                <FormSelectField
                  form={form}
                  formKey="biologicalSex"
                  label="Biological Sex"
                  options={[
                    { value: "M", label: "Male" },
                    { value: "F", label: "Female" },
                  ]}
                  placeholder="Select biological sex"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="maritalStatus"
                  label="Marital Status"
                  placeholder="Enter marital status"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="placeOfBirth"
                  label="Place of Birth"
                  placeholder="Enter place of birth"
                  className="h-16 text-xl"
                />
                <FormDateField
                  form={form}
                  formKey="dateOfBirth"
                  label="Date of Birth"
                  className="h-16 text-xl"
                />
                <div className="col-span-2 mt-8 flex justify-end gap-6">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep(step - 1)}
                    className={buttonClasses}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep(step + 1)}
                    className={buttonClasses}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-x-8 gap-y-8"
              >
                <FormTextField
                  form={form}
                  formKey="height"
                  label="Height (cm)"
                  inputType="number"
                  placeholder="Enter height in cm"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="weight"
                  label="Weight (kg)"
                  inputType="number"
                  placeholder="Enter weight in kg"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="basicCommunityTax"
                  label="Basic Community Tax"
                  inputType="number"
                  placeholder="Enter basic community tax"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="additionalCommunityTax"
                  label="Additional Community Tax"
                  inputType="number"
                  placeholder="Enter additional community tax"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="grossReceiptFromBusiness"
                  label="Gross Receipt from Business"
                  inputType="number"
                  placeholder="Enter gross receipt from business"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="salariesOfOccupationIncome"
                  label="Salaries of Occupation Income"
                  inputType="number"
                  placeholder="Enter salaries of occupation income"
                  className="h-16 text-xl"
                />
                <FormTextField
                  form={form}
                  formKey="rentalFromRealProperty"
                  label="Rental from Real Property"
                  inputType="number"
                  placeholder="Enter rental from real property"
                  className="h-16 text-xl"
                />
                <div className="col-span-2 mt-8 flex justify-end gap-6">
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => setStep(step - 1)}
                    className={buttonClasses}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="lg" className={buttonClasses}>
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
