"use client";

// Import missing dependencies
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

const naturesOfBusiness = [
  "Advertising",
  "Agricultural",
  "Airlines",
  "Amusement Places",
  "Banks",
  "Brokerage",
  "Call Center",
  "Canteen",
  "Construction",
  "Consultancy",
  "Convenience Store",
  "Cooperative",
  "Distributor",
  "Educational Institution",
  "Exporter",
  "Financing Institution",
  "Food Chain/Kiosk",
  "Foreign Exchange Dealer",
  "Forwarding",
  "Foundation",
  "Holdings",
  "Hotels/Apartelles",
  "Importer",
  "Insurance Broker",
  "Investment",
  "Jollijeep",
  "Manufacturer",
  "Manpower",
  "Merchandise",
  "Mining",
  "Music Lounge/Bar",
  "Non-Stock Non Profit",
  "Pawnshop",
  "Pre-need Company",
  "Real Estate Dealer",
  "Real Estate Developer",
  "Real Estate Lessor",
  "Representative/Regional Office",
  "Restaurant",
  "Retailer",
  "Security Agency",
  "Services",
  "Shopping Center",
  "Trading",
  "Wholesale",
];

export const BusinessClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const schema = z.object({
    purpose: z.enum(["New Business", "Renewal", "Change Business Address"]),
    dateApplied: z.date(),
    plateNumber: z.string().min(1, "Plate Number is required"),
    businessName: z.string().min(1, "Business Name is required"),
    tradeName: z.string().optional(),
    businessAddress: z.object({
      unitRoom: z.string().min(1, "Unit/Room is required"),
      floor: z.string().min(1, "Floor is required"),
      building: z.string().min(1, "Building is required"),
      streetNo: z.string().min(1, "Street No. is required"),
      street: z.string().min(1, "Street is required"),
      locale: z.string().min(1, "Locale is required"),
    }),
    natureOfBusiness: z.enum(naturesOfBusiness),
    businessTinNo: z.string().min(1, "Business Tin No. is required"),
    contactPerson: z.string().min(1, "Contact Person is required"),
    telephoneNo: z.string().min(1, "Telephone No. is required"),
    faxNo: z.string().min(1, "Fax No. is required"),
    emailAddress: z.email("Invalid email address"),
    capitalization: z
      .number()
      .min(0, "Capitalization must be positive")
      .optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      purpose: "New Business",
      dateApplied: new Date(),
      plateNumber: "",
      businessName: "",
      tradeName: "",
      businessAddress: {
        unitRoom: "",
        floor: "",
        building: "",
        streetNo: "",
        street: "",
        locale: "",
      },
      natureOfBusiness: "Advertising",
      businessTinNo: "",
      contactPerson: "",
      telephoneNo: "",
      faxNo: "",
      emailAddress: "",
      capitalization: 0,
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
          <CardTitle className="text-lg">Business Clearance Form</CardTitle>
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
                <FormSelectField
                  form={form}
                  formKey="purpose"
                  label="Purpose"
                  options={[
                    { value: "New Business", label: "New Business" },
                    { value: "Renewal", label: "Renewal" },
                    {
                      value: "Change Business Address",
                      label: "Change Business Address",
                    },
                  ]}
                  placeholder="Select purpose"
                  className="w-full"
                />
                <FormDateField
                  form={form}
                  formKey="dateApplied"
                  label="Date Applied"
                />
                <FormTextField
                  form={form}
                  formKey="plateNumber"
                  label="Plate Number"
                  placeholder="Enter plate number"
                />
                <FormTextField
                  form={form}
                  formKey="businessName"
                  label="Business Name"
                  placeholder="Enter business name"
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
                  formKey="tradeName"
                  label="Trade Name"
                  placeholder="Enter trade name (optional)"
                  optional
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.unitRoom"
                  label="Unit/Room"
                  placeholder="Enter unit/room"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.floor"
                  label="Floor"
                  placeholder="Enter floor"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.building"
                  label="Building"
                  placeholder="Enter building"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.streetNo"
                  label="Street No."
                  placeholder="Enter street number"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.street"
                  label="Street"
                  placeholder="Enter street"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.locale"
                  label="Locale"
                  placeholder="Enter locale"
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
                <FormSelectField
                  form={form}
                  formKey="natureOfBusiness"
                  label="Nature of Business"
                  options={[
                    { value: "Advertising", label: "Advertising" },
                    { value: "Agricultural", label: "Agricultural" },
                    { value: "Airlines", label: "Airlines" },
                  ]}
                  placeholder="Select nature of business"
                />
                <FormTextField
                  form={form}
                  formKey="businessTinNo"
                  label="Business TIN"
                  placeholder="Enter business TIN"
                />
                <FormTextField
                  form={form}
                  formKey="contactPerson"
                  label="Contact Person"
                  placeholder="Enter contact person"
                />
                <FormTextField
                  form={form}
                  formKey="telephoneNo"
                  label="Telephone No."
                  placeholder="Enter telephone number"
                />
                <FormTextField
                  form={form}
                  formKey="faxNo"
                  label="Fax No."
                  placeholder="Enter fax number"
                />
                <FormTextField
                  form={form}
                  formKey="emailAddress"
                  label="Email Address"
                  placeholder="Enter email address"
                />
                <FormTextField
                  form={form}
                  formKey="capitalization"
                  label="Capitalization"
                  placeholder="Enter capitalization (optional)"
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
