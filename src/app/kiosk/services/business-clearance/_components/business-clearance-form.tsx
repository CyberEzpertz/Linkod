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

const naturesOfBusiness = [
  "Advertising", "Agricultural", "Airlines", "Amusement Places", "Banks",
  "Brokerage", "Call Center", "Canteen", "Construction", "Consultancy",
  "Convenience Store", "Cooperative", "Distributor", "Educational Institution",
  "Exporter", "Financing Institution", "Food Chain/Kiosk", "Foreign Exchange Dealer",
  "Forwarding", "Foundation", "Holdings", "Hotels/Apartelles", "Importer",
  "Insurance Broker", "Investment", "Jollijeep", "Manufacturer", "Manpower",
  "Merchandise", "Mining", "Music Lounge/Bar", "Non-Stock Non Profit",
  "Pawnshop", "Pre-need Company", "Real Estate Dealer", "Real Estate Developer",
  "Real Estate Lessor", "Representative/Regional Office", "Restaurant", "Retailer",
  "Security Agency", "Services", "Shopping Center", "Trading", "Wholesale",
] as const;

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
  capitalization: z.number().min(0, "Capitalization must be positive").optional(),
});

type FormData = z.infer<typeof schema>;

export const BusinessClearanceForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const form = useForm<FormData>({
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

  const { handleSubmit, reset } = form;

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
  const buttonClasses = "text-2xl px-12 py-6 rounded-xl shadow-md active:scale-95 transition-transform";

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
          <CardTitle className="text-4xl font-bold">Business Clearance Form</CardTitle>
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
                  <FormSelectField
                    form={form}
                    formKey="purpose"
                    label="Purpose"
                    options={[
                      { value: "New Business", label: "New Business" },
                      { value: "Renewal", label: "Renewal" },
                      { value: "Change Business Address", label: "Change Business Address" },
                    ]}
                    placeholder="Select purpose"
                    className="text-xl h-16"
                  />
                </div>
                <FormDateField
                  form={form}
                  formKey="dateApplied"
                  label="Date Applied"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="plateNumber"
                  label="Plate Number"
                  placeholder="Enter plate number"
                  className="text-xl h-16"
                />
                <div className="col-span-2">
                  <FormTextField
                    form={form}
                    formKey="businessName"
                    label="Business Name"
                    placeholder="Enter business name"
                    className="text-xl h-16"
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-6 mt-8">
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
                    formKey="tradeName"
                    label="Trade Name"
                    placeholder="Enter trade name (optional)"
                    optional
                    className="text-xl h-16"
                  />
                </div>
                <FormTextField
                  form={form}
                  formKey="businessAddress.unitRoom"
                  label="Unit/Room"
                  placeholder="Enter unit/room"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.floor"
                  label="Floor"
                  placeholder="Enter floor"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.building"
                  label="Building"
                  placeholder="Enter building"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.streetNo"
                  label="Street No."
                  placeholder="Enter street number"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.street"
                  label="Street"
                  placeholder="Enter street"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="businessAddress.locale"
                  label="Locale"
                  placeholder="Enter locale"
                  className="text-xl h-16"
                />
                <div className="col-span-2 flex justify-end gap-6 mt-8">
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
                <div className="col-span-2">
                  <FormSelectField
                    form={form}
                    formKey="natureOfBusiness"
                    label="Nature of Business"
                    options={naturesOfBusiness.map(nature => ({
                      value: nature,
                      label: nature,
                    }))}
                    placeholder="Select nature of business"
                    className="text-xl h-16"
                  />
                </div>
                <FormTextField
                  form={form}
                  formKey="businessTinNo"
                  label="Business TIN"
                  placeholder="Enter business TIN"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="contactPerson"
                  label="Contact Person"
                  placeholder="Enter contact person"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="telephoneNo"
                  label="Telephone No."
                  placeholder="Enter telephone number"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="faxNo"
                  label="Fax No."
                  placeholder="Enter fax number"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="emailAddress"
                  label="Email Address"
                  placeholder="Enter email address"
                  className="text-xl h-16"
                />
                <FormTextField
                  form={form}
                  formKey="capitalization"
                  label="Capitalization"
                  placeholder="Enter capitalization (optional)"
                  optional
                  className="text-xl h-16"
                />
                <div className="col-span-2 flex justify-end gap-6 mt-8">
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
                    className={buttonClasses}
                  >
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