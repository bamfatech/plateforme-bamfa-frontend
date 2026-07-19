import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { contact } from "@/content/contact";

export const metadata = {
  title: "Contact — BAMFA",
  description: "Contactez BAMFA : question, partenariat ou proposition.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title={contact.header.title} intro={contact.header.intro} />
      <Section>
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactForm />
          <ul className="flex flex-col gap-4 text-stone-700">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <a className="hover:underline" href={`mailto:${contact.coordinates.email}`}>
                {contact.coordinates.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span>{contact.coordinates.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <span>{contact.coordinates.address}</span>
            </li>
          </ul>
        </Container>
      </Section>
    </>
  );
}
