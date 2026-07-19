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
    <Card className="flex gap-4">
      <Icon className="h-6 w-6 shrink-0 text-primary-600" aria-hidden="true" />
      <div>
        <h3 className="font-heading font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-stone-600">{description}</p>
      </div>
    </Card>
  );
}
