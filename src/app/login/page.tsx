"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextField } from "@/components/forms/form-text-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormValues) {
    router.push("/");
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-1rem)] mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 px-6 py-4">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormTextField
                form={form}
                formKey="email"
                label="Email"
                placeholder="Enter your email"
                inputType="email"
              />
              <FormTextField
                form={form}
                formKey="password"
                label="Password"
                placeholder="Enter your password"
                inputType="password"
              />
              <Button type="submit" className="w-full mt-6">
                Login
              </Button>
              <div className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}