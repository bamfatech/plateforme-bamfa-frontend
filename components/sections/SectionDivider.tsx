import { FlameGlyph } from "@/components/brand/FlameGlyph";
import { Container } from "@/components/ui/Container";

export function SectionDivider() {
  return (
    <Container>
      <div className="flex items-center gap-4 py-4" aria-hidden="true">
        <span className="h-px flex-1 bg-stone-300" />
        <FlameGlyph className="h-4 w-4 text-flame" />
        <span className="h-px flex-1 bg-stone-300" />
      </div>
    </Container>
  );
}
