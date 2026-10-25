import { useState, type FormEvent } from "react";
import { site } from "../config/site";
import { contactSchema, validate, type FieldErrors } from "../lib/schemas";
import { submitContact } from "../lib/api";
import { FormField } from "../components/FormField";
import { MapEmbed, DirectionsButton } from "../components/Directions";
import { WhatsAppLink } from "../components/WhatsAppButton";

type Status = "idle" | "loading" | "error" | "success";

export default function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const result = validate(contactSchema, Object.fromEntries(new FormData(form)));
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await submitContact(result.data);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-bold">Contact &amp; support</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
          <FormField label="Name" name="name" error={errors.name} autoComplete="name" />
          <FormField label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
          <FormField label="Phone (optional)" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
          <FormField label="Message" name="message" as="textarea" error={errors.message} />
          {status === "success" && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-green-900">
              Thanks — we've received your message and will reply by email. For faster help, use WhatsApp.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
              We couldn't send your message. Please try again or use WhatsApp.
            </p>
          )}
          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </form>

        <div className="space-y-6">
          <address className="not-italic">
            <p>{site.addressText}</p>
            <p className="mt-2">{site.phoneDisplay}</p>
            <p>{site.email}</p>
            <p className="mt-2">{site.hours}</p>
          </address>
          <div className="flex flex-wrap gap-3">
            <WhatsAppLink intent={{ type: "general" }}>Chat on WhatsApp</WhatsAppLink>
            <DirectionsButton />
          </div>
          <MapEmbed />
          <section aria-labelledby="workflow">
            <h2 id="workflow" className="text-xl font-bold">What happens next</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted">
              <li>You send the form or a WhatsApp message.</li>
              <li>You see an on-screen confirmation straight away.</li>
              <li>PLACEHOLDER — state the real reply time, e.g. “within one business day”.</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
