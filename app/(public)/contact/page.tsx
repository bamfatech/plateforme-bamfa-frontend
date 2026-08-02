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
  {
    icon: Mail,
    label: "E-mail",
    value: contact.coordinates.email,
    href: `mailto:${contact.coordinates.email}`,
  },
  { icon: Phone, label: "Téléphone", value: contact.coordinates.phone },
  { icon: MapPin, label: "Adresse", value: contact.coordinates.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title={contact.header.title} intro={contact.header.intro} />
      <Section>
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">
              {contact.panel.title}
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-stone-600">{contact.panel.text}</p>
            <ul className="mt-10 divide-y divide-stone-300 border-y border-stone-300">
              {coordinates.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-4 py-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-flame-ink" aria-hidden="true" />
                    <div>
                      <div className="font-mono text-xs uppercase tracking-[0.15em] text-stone-600">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-ink underline-offset-4 hover:underline">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-ink">{item.value}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
