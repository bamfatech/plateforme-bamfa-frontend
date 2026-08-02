import { FlameGlyph } from "@/components/brand/FlameGlyph";
import { Container } from "@/components/ui/Container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="border-b border-stone-300 bg-paper">
      <Container className="py-16 sm:py-20">
        <FlameGlyph className="h-6 w-6 text-flame" />
        <h1 className="mt-5 max-w-4xl font-heading text-5xl font-semibold leading-[1.0] tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{intro}</p>
        )}
      </Container>
    </section>
  );
}
