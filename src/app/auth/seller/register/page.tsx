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

export const formSchema = z.object({
  shopname: z
    .string()
    .trim()
    .min(3, "Shop name is required")
    .max(100, "Shop name is too long"),

  phone_no: z
    .string()
    .trim()
    .min(10, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),

  address: z
    .string()
    .min(5, "Address is required")
    .max(200, "Address is too long"),

  email: z
    .string()
    .trim()
    .min(8, "Email is required")
    .max(100, "Email is too long")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),

  password: z
    .string()
    .trim()
    .min(8, "Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export default function SellerRegisterPage() {
  const { register } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopname: "",
      phone_no: "",
      address: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await register({
        email: data.email,
        password: data.password,
        role: "seller",
        name: data.shopname, // User's name (using shop name for now)
        shopName: data.shopname, // Shop name for sellers
        phone_no: data.phone_no, // Phone number for sellers
        address: data.address, // Address for sellers
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Become a Seller</CardTitle>
        <CardDescription>Register your shop. Approval required from admin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="seller-register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="shopname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="shopname">
                    Shop Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="shopname"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="organization"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone_no"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone_no">
                    Phone Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone_no"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="tel"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="address">
                    Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="address"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="street-address"
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
          form="seller-register-form"
          className="w-full bg-gray-900 text-white hover:bg-gray-800"
        >
          Register as Seller
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
