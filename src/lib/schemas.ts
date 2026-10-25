import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{8,15}$/, "Enter a valid phone number");

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone,
  email: z.string().trim().email("Enter a valid email").or(z.literal("")),
  address: z.string().trim().min(8, "Enter your delivery address"),
  payment: z.string().min(1, "Choose a payment option"),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: phone.or(z.literal("")),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

export type FieldErrors = Record<string, string>;

export function validate<T>(schema: z.ZodType<T>, data: unknown):
  { ok: true; data: T } | { ok: false; errors: FieldErrors } {
  const r = schema.safeParse(data);
  if (r.success) return { ok: true, data: r.data };
  const errors: FieldErrors = {};
  for (const issue of r.error.issues) {
    const k = String(issue.path[0] ?? "form");
    if (!errors[k]) errors[k] = issue.message;
  }
  return { ok: false, errors };
}
