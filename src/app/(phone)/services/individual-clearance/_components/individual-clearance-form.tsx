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
import { getLatestOcrData } from "@/lib/ocr-autofill";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define form data type for type safety
type IndividualClearanceFormData = {
  fullName: string;
  age: number;
  civilStatus: string;
  address: string;
  purpose: string;
  ctcNumber: string;
};

export const IndividualClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;
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

  // Set up default values, possibly from OCR
  const ocrData = typeof window !== "undefined" ? getLatestOcrData() : null;

  const form = useForm<IndividualClearanceFormData>({
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
    if (typeof window !== "undefined") {
      const ocr = getLatestOcrData();
      if (ocr) {
        setValue("fullName", ocr.name || "");
        setValue("age", ocr.dob ? getAgeFromDob(ocr.dob) : 0);
        setValue("address", ocr.address || "");
        setValue("ctcNumber", ocr.licenseNumber || "");
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
                    type="button"
                    size="sm"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>

      {step === 2 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Required Documents</CardTitle>
            <CardDescription>
              Please prepare the following documents:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">For New Application:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Certification from Building Administrator (for Salcedo
                    Village, Malugay Area & Jazz Residences)
                  </li>
                  <li>Community Tax Certificate (Cedula) (current year)</li>
                  <li>Barangay I.D / Village ID</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">For Renewal Application:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Certification from Building Administrator (for Salcedo
                    Village, Malugay Area & Jazz Residences)
                  </li>
                  <li>Community Tax Certificate (Cedula) (current year)</li>
                  <li>Barangay I.D / Village ID</li>
                </ul>
              </div>
              <div className="ml-auto inline-flex gap-2">
                <Button type="button" size="sm" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
