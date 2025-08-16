"use client";

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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  age: z.number("Invalid age").min(1, "Age must be greater than 0"),
  civilStatus: z.string().min(1, "Civil Status is required"),
  address: z.string().min(1, "Address is required"),
  purpose: z.string().min(1, "Purpose is required"),
  ctcNumber: z.string().min(1, "CTC Number is required"),
});

type FormData = z.infer<typeof schema>;

export const IndividualClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

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

  const form = useForm<FormData>({
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

  const { handleSubmit, reset, setValue } = form;

  // On mount, if OCR data exists, update form values
  useEffect(() => {
    if (ocrData) {
      setValue("fullName", ocrData.name || "");
      setValue("age", ocrData.dob ? getAgeFromDob(ocrData.dob) : 0);
      setValue("address", ocrData.address || "");
      setValue("ctcNumber", ocrData.licenseNumber || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData: FormData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      setStep(0);
      reset();
      toast.success("Form successfully submitted");
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
            Individual Clearance Form
          </CardTitle>
          <CardDescription className="text-2xl">
            Step {step + 1} of {totalSteps}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <Form {...form}>
            {step === 0 && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-x-8 gap-y-8"
              >
                <div className="col-span-2">
                  <FormTextField
                    form={form}
                    formKey="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    className="h-16 text-xl"
                  />
                </div>
                <FormTextField
                  form={form}
                  formKey="age"
                  label="Age"
                  inputType="number"
                  placeholder="Enter your age"
                  className="h-16 text-xl"
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
                <div className="col-span-2">
                  <FormTextField
                    form={form}
                    formKey="address"
                    label="Address"
                    placeholder="Enter your address"
                    className="h-16 text-xl"
                  />
                </div>
                <div className="col-span-2">
                  <FormTextArea
                    form={form}
                    formKey="purpose"
                    label="Purpose"
                    placeholder="Enter the purpose"
                    className="min-h-[160px] py-4 text-xl"
                  />
                </div>
                <div className="col-span-2">
                  <FormTextField
                    form={form}
                    formKey="ctcNumber"
                    label="Community Tax Certificate #"
                    placeholder="Enter CTC #"
                    className="h-16 text-xl"
                  />
                </div>
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
          </Form>
        </CardContent>
      </Card>

      {step === 2 && (
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 p-8">
            <CardTitle className="text-4xl font-bold">
              Required Documents
            </CardTitle>
            <CardDescription className="text-2xl">
              Please prepare the following documents:
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-semibold">
                  For New Application:
                </h3>
                <ul className="list-disc space-y-4 pl-8 text-xl">
                  <li>
                    Certification from Building Administrator (for Salcedo
                    Village, Malugay Area & Jazz Residences)
                  </li>
                  <li>Community Tax Certificate (Cedula) (current year)</li>
                  <li>Barangay I.D / Village ID</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold">
                  For Renewal Application:
                </h3>
                <ul className="list-disc space-y-4 pl-8 text-xl">
                  <li>
                    Certification from Building Administrator (for Salcedo
                    Village, Malugay Area & Jazz Residences)
                  </li>
                  <li>Community Tax Certificate (Cedula) (current year)</li>
                  <li>Barangay I.D / Village ID</li>
                </ul>
              </div>
              <div className="mt-8 flex justify-end gap-6">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => setStep(step - 1)}
                  className={buttonClasses}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  onClick={handleSubmit(onSubmit)}
                  className={buttonClasses}
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
