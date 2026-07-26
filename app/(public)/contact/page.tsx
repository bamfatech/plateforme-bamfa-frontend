import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { contact } from "@/content/contact";

export const metadata = {
  title: "Contact — BAMFA",
  description: "Contactez BAMFA : question, partenariat ou proposition.",
};

const coordinates = [
  { icon: Mail, label: "E-mail", value: contact.coordinates.email, href: `mailto:${contact.coordinates.email}` },
  { icon: Phone, label: "Téléphone", value: contact.coordinates.phone },
  { icon: MapPin, label: "Adresse", value: contact.coordinates.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title={contact.header.title} intro={contact.header.intro} />
      <Section>
        <Container>
          <div className="grid overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm lg:grid-cols-5">
            {/* Panneau dégradé */}
            <div className="relative overflow-hidden bg-brand-gradient p-8 text-white sm:p-10 lg:col-span-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              />
              {/* Voile sombre pour garantir le contraste AA du texte blanc */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/20" />
              <h2 className="relative font-heading text-2xl font-bold">{contact.panel.title}</h2>
              <p className="relative mt-3 text-white/90">{contact.panel.text}</p>
              <ul className="relative mt-8 space-y-5">
                {coordinates.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-white/85">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a href={item.href} className="hover:underline">
                            {item.value}
                          </a>
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Formulaire */}
            <div className="p-8 sm:p-10 lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
