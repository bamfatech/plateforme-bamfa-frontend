import { Container } from "@/components/ui/Container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="bg-cream">
      <Container className="py-14 sm:py-16">
        <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-stone-600">{intro}</p>}
      </Container>
    </section>
  );
}
