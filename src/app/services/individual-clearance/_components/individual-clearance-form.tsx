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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const IndividualClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 2;

  const schema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    age: z.number("Invalid age").min(1, "Age must be greater than 0"),
    civilStatus: z.string().min(1, "Civil Status is required"),
    address: z.string().min(1, "Address is required"),
    purpose: z.string().min(1, "Purpose is required"),
    ctcNumber: z.string().min(1, "CTC Number is required"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      age: 0,
      civilStatus: "",
      address: "",
      purpose: "",
      ctcNumber: "",
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (formData: unknown) => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      setStep(0);
      reset();

      toast.success("Form successfully submitted");
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
