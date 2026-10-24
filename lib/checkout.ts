import { z } from "zod";

export const countries = ["United States", "United Kingdom", "France", "Japan", "Thailand", "Australia"] as const;

export const shippingMethods = {
  standard: { label: "Standard", detail: "3–5 working days", price: 0 },
  express: { label: "Express", detail: "1–2 working days", price: 18 },
} as const;

export type ShippingMethod = keyof typeof shippingMethods;

export const checkoutSchema = z.object({
  email: z.email("Enter a valid email address."),
  firstName: z.string().trim().min(1, "Enter your first name."),
  lastName: z.string().trim().min(1, "Enter your last name."),
  phone: z
    .string()
    .trim()
    .regex(/^$|^[+()\d\s-]{7,20}$/, "Enter a valid phone number, or leave it blank."),
  address: z.string().trim().min(4, "Enter your street address."),
  apartment: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city."),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/, "Enter a valid postal code."),
  country: z.enum(countries, { error: "Choose a country." }),
  shipping: z.enum(["standard", "express"]),
  acknowledge: z.boolean().refine((v) => v, "Please confirm you understand this is a demonstration."),
});

export type CheckoutValues = z.input<typeof checkoutSchema>;
export type CheckoutData = z.output<typeof checkoutSchema>;

export function demoReference(): string {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return `SORA-DEMO-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}
