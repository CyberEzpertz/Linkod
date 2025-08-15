"use client";

// Import missing form components
import { FormComboboxField } from "@/components/forms/form-combobox-field";
import { FormTextArea } from "@/components/forms/form-text-area";
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

export const IndividualClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 2;
  const router = useRouter();

  const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    age: z.number("Invalid age").min(1, "Age must be greater than 0"),
    civilStatus: z.string().min(1, "Civil Status is required"),
    address: z.string().min(1, "Address is required"),
    purpose: z.string().min(1, "Purpose is required"),
    ctcNumber: z.string().min(1, "CTC Number is required"),
  });

  // Helper to extract age from dob (YYYY-MM-DD)
  function getAgeFromDob(dob: string): number {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Try to get latest driver's license OCR data from sessionStorage
  function getLatestOcrData() {
    if (typeof window === "undefined") return null;
    try {
      const extraDocs = JSON.parse(
        sessionStorage.getItem("extraDocuments") || "[]"
      );
      // Find the most recent document with ocr and type "ID Card" or name includes "Driver"
      const doc = [...extraDocs]
        .reverse()
        .find(
          (d: any) =>
            d.type === "ID Card" &&
            d.name &&
            d.name.toLowerCase().includes("driver") &&
            d.ocr &&
            typeof d.ocr === "object"
        );
      return doc?.ocr || null;
    } catch {
      return null;
    }
  }

  // Set up default values, possibly from OCR
  const ocrData = typeof window !== "undefined" ? getLatestOcrData() : null;

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      fullName: ocrData?.name || "",
      age: ocrData?.dob ? getAgeFromDob(ocrData.dob) : 0,
      civilStatus: "",
      address: ocrData?.address || "",
      purpose: "",
      ctcNumber: ocrData?.licenseNumber || "",
    },
  });

  const { handleSubmit, control, reset, setValue } = form;

  // On mount, if OCR data exists, update form values (for client-side hydration)
  useEffect(() => {
    if (ocrData) {
      setValue("fullName", ocrData.name || "");
      setValue("age", ocrData.dob ? getAgeFromDob(ocrData.dob) : 0);
      setValue("address", ocrData.address || "");
      setValue("ctcNumber", ocrData.licenseNumber || "");
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

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
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
          <CardTitle className="text-lg">Individual Clearance Form</CardTitle>
          <CardDescription>
            Step {step + 1} of {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === 0 && (
              <form
                onSubmit={handleSubmit(onSubmit, console.error)}
                className="grid gap-y-4"
              >
                <FormTextField
                  form={form}
                  formKey="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                />
                <FormTextField
                  form={form}
                  formKey="age"
                  label="Age"
                  inputType="number"
                  placeholder="Enter your age"
                />
                <FormComboboxField
                  form={form}
                  formKey="civilStatus"
                  label="Civil Status"
                  data={[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                    { value: "widowed", label: "Widowed" },
                  ]}
                  selectMessage="Select your civil status"
                />
                <div className="ml-auto inline-flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type={step === totalSteps - 1 ? "submit" : "button"}
                    size="sm"
                    onClick={() => {
                      if (step < totalSteps - 1) {
                        setStep(step + 1);
                      }
                    }}
                  >
                    {step === totalSteps - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </form>
            )}
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                <FormTextField
                  form={form}
                  formKey="address"
                  label="Address"
                  placeholder="Enter your address"
                />
                <FormTextArea
                  form={form}
                  formKey="purpose"
                  label="Purpose"
                  placeholder="Enter the purpose"
                />
                <FormTextField
                  form={form}
                  formKey="ctcNumber"
                  label="Community Tax Certificate #"
                  placeholder="Enter CTC #"
                />
                <div className="ml-auto inline-flex gap-2">
                  <Button type="button" size="sm" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    type={step === totalSteps - 1 ? "submit" : "button"}
                    size="sm"
                    onClick={() => {
                      if (step < totalSteps - 1) {
                        setStep(step + 1);
                      }
                    }}
                  >
                    {step === totalSteps - 1 ? "Submit" : "Next"}
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
