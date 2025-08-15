"use client";

import { FormTextField } from "@/components/forms/form-text-field";
import LinkodLogo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
    <div className="to-secondary/50 relative min-h-screen bg-linear-to-b">
      <div className="bg-secondary absolute -z-10 h-32 w-full rounded-b-[80%]" />
      <div className="container mx-auto flex min-h-[calc(100vh-1rem)] flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <LinkodLogo className="mb-8" />
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="px-6 py-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center text-sm">
                  {"Don't have an account? "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Register here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
