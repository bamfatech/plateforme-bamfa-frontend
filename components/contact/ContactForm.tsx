"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Le nom est requis.";
    if (!values.email.trim()) e.email = "L'e-mail est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Format d'e-mail invalide.";
    if (!values.message.trim()) e.message = "Le message est requis.";
    return e;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSent(false);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // TODO Sprint 2 : brancher POST /api/v1/forms/contact/
      setSent(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {sent && <Alert variant="info">Merci ! Le formulaire sera bientôt opérationnel.</Alert>}
      <Field
        label="Nom"
        value={values.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
      <Field
        label="E-mail"
        type="email"
        value={values.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />
      <Field
        label="Sujet"
        value={values.subject}
        onChange={(e) => set("subject", e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`rounded-md border px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            errors.message ? "border-danger" : "border-stone-300"
          }`}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-danger-text">
            {errors.message}
          </p>
        )}
      </div>
      <Button type="submit" className="self-start">
        Envoyer
      </Button>
    </form>
  );
}
