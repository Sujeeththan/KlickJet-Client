"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname is required")
    .regex(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/, "Invalid name format"),
  email: z
    .string()
    .min(1, "Email is required"),
    
  licenseNumber: z
    .string()
    .min(5, "License number is required")
    .max(20, "License number is too long"),
  nic: z
    .string()
    .min(8 , "Nic number is request")
    .regex(
      /^([0-9]{9}[VvXx]|[0-9]{12})$/,
      "Enter a valid Sri Lankan NIC number"
    ),
  password: z
    .string()
    .min(8, "Password is request")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export default function DelivererRegisterPage() {
  const { register } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      licenseNumber: "",
      nic: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await register({
        ...data,
        role: "deliverer",
        name: data.fullname,
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Join as Deliverer</CardTitle>
        <CardDescription>Register to become a delivery agent. Approval required from admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="deliverer-register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullname">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="fullname"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="licenseNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="licenseNumber">License Number</FieldLabel>
                  <Input
                    {...field}
                    id="licenseNumber"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="nic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nic">NIC</FieldLabel>
                  <Input
                    {...field}
                    id="nic"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="new-password"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          type="submit" 
          form="deliverer-register-form"
          className="w-full bg-gray-900 text-white hover:bg-gray-800"
        >
          Register as Deliverer
        </Button>
        <CardDescription className="text-center">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
