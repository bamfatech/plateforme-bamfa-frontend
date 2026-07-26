import { Mail, MapPin, Phone } from "lucide-react";

import { Card } from "@/components/ui/Card";
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
      <Section className="bg-cream">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <ContactForm />
          </Card>
          <div className="flex flex-col gap-4 lg:col-span-2">
            {coordinates.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                    <Icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-stone-500">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-ink transition hover:text-primary-700">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink">{item.value}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
