import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <Icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
      <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-stone-600">{description}</p>
    </Card>
  );
}
