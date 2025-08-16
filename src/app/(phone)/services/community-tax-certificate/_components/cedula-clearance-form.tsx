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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { getLatestOcrData, parseOcrName } from "@/lib/ocr-autofill";

export const CedulaClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;
  const router = useRouter();

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
    basicCommunityTax: z
      .number()
      .min(0, "Basic Community Tax must be positive"),
    additionalCommunityTax: z
      .number()
      .min(0, "Additional Community Tax must be positive"),
    grossReceiptFromBusiness: z
      .number()
      .min(0, "Gross Receipt must be positive"),
    salariesOfOccupationIncome: z.number().min(0, "Salaries must be positive"),
    rentalFromRealProperty: z.number().min(0, "Rental must be positive"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      surname: "",
      firstName: "",
      middleName: "",
      address: "",
      occupation: "",
      tinNumber: "",
      biologicalSex: "M",
      maritalStatus: "",
      placeOfBirth: "",
      dateOfBirth: new Date(),
      height: 0,
      weight: 0,
      basicCommunityTax: 0,
      additionalCommunityTax: 0,
      grossReceiptFromBusiness: 0,
      salariesOfOccupationIncome: 0,
      rentalFromRealProperty: 0,
    },
  });

  const { handleSubmit, reset, setValue } = form;

  // OCR autofill effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ocr = getLatestOcrData();
      if (ocr) {
        if (ocr.name) {
          const { surname, firstName, middleName } = parseOcrName(ocr.name);
          setValue("surname", surname);
          setValue("firstName", firstName);
          setValue("middleName", middleName);
        }
        if (ocr.address) {
          setValue("address", ocr.address);
        }
        if (ocr.dob) {
          // Try to parse date string to Date object
          const date = new Date(ocr.dob);
          if (!isNaN(date.getTime())) {
            setValue("dateOfBirth", date);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData: unknown) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      toast.success("Form successfully submitted");
      router.push("/");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "h-4 w-4 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary"
              )}
            />
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Cedula Clearance Form</CardTitle>
          <CardDescription>
            Step {step + 1} of {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === 0 && (
              <form
                onSubmit={handleSubmit(onSubmit, () =>
                  toast.error("Please fill out all required fields")
                )}
                className="grid gap-y-4"
              >
                <FormTextField
                  form={form}
                  formKey="surname"
                  label="Surname"
                  placeholder="Enter surname"
                />
                <FormTextField
                  form={form}
                  formKey="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <FormTextField
                  form={form}
                  formKey="middleName"
                  label="Middle Name"
                  placeholder="Enter middle name (optional)"
                  optional
                />
                <FormTextField
                  form={form}
                  formKey="address"
                  label="Address"
                  placeholder="Enter address"
                />
                <FormTextField
                  form={form}
                  formKey="occupation"
                  label="Occupation"
                  placeholder="Enter occupation"
                />
                <div className="ml-auto inline-flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}
            {step === 1 && (
              <form
                onSubmit={handleSubmit(onSubmit, console.error)}
                className="grid gap-y-4"
              >
                <FormTextField
                  form={form}
                  formKey="tinNumber"
                  label="TIN #"
                  placeholder="Enter TIN # (optional)"
                  optional
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
                />
                <FormTextField
                  form={form}
                  formKey="maritalStatus"
                  label="Marital Status"
                  placeholder="Enter marital status"
                />
                <FormTextField
                  form={form}
                  formKey="placeOfBirth"
                  label="Place of Birth"
                  placeholder="Enter place of birth"
                />
                <FormDateField
                  form={form}
                  formKey="dateOfBirth"
                  label="Date of Birth"
                />
                <div className="ml-auto inline-flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}
            {step === 2 && (
              <form
                onSubmit={handleSubmit(onSubmit, console.error)}
                className="grid gap-y-4"
              >
                <FormTextField
                  form={form}
                  formKey="height"
                  label="Height (cm)"
                  inputType="number"
                  placeholder="Enter height in cm"
                />
                <FormTextField
                  form={form}
                  formKey="weight"
                  label="Weight (kg)"
                  inputType="number"
                  placeholder="Enter weight in kg"
                />
                <FormTextField
                  form={form}
                  formKey="basicCommunityTax"
                  label="Basic Community Tax"
                  inputType="number"
                  placeholder="Enter basic community tax"
                />
                <FormTextField
                  form={form}
                  formKey="additionalCommunityTax"
                  label="Additional Community Tax"
                  inputType="number"
                  placeholder="Enter additional community tax"
                />
                <FormTextField
                  form={form}
                  formKey="grossReceiptFromBusiness"
                  label="Gross Receipt from Business"
                  inputType="number"
                  placeholder="Enter gross receipt from business"
                />
                <FormTextField
                  form={form}
                  formKey="salariesOfOccupationIncome"
                  label="Salaries of Occupation Income"
                  inputType="number"
                  placeholder="Enter salaries of occupation income"
                />
                <FormTextField
                  form={form}
                  formKey="rentalFromRealProperty"
                  label="Rental from Real Property"
                  inputType="number"
                  placeholder="Enter rental from real property"
                />
                <div className="ml-auto inline-flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm">
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
