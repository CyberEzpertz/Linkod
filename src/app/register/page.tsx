"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextField } from "@/components/forms/form-text-field";
import FormDateField from "@/components/forms/form-date-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    lastName: z.string().min(1, "Last name is required"),
    firstName: z.string().min(1, "First name is required"),
    email: z.string().email("Invalid email address"),
    birthday: z.date({
      message: "Birthday is required",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: FormValues) {
    router.push("/login");
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-1rem)] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 px-6 py-4">
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormTextField
                  form={form}
                  formKey="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
                <FormTextField
                  form={form}
                  formKey="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <FormTextField
                  form={form}
                  formKey="email"
                  label="Email"
                  placeholder="Enter your email"
                  inputType="email"
                />
                <FormDateField
                  form={form}
                  formKey="birthday"
                  label="Birthday"
                  rangeEnd={new Date()}
                />
                <FormTextField
                  form={form}
                  formKey="password"
                  label="Password"
                  placeholder="Enter your password"
                  inputType="password"
                />
                <FormTextField
                  form={form}
                  formKey="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  inputType="password"
                />
              </div>
              <Button type="submit" className="mt-6 w-full">
                Register
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
