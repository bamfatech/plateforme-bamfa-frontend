import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";

export function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex h-full gap-4">
      <Icon className="h-6 w-6 shrink-0 text-flame-ink" aria-hidden="true" />
      <div>
        <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-600">{description}</p>
      </div>
    </Card>
  );
}
