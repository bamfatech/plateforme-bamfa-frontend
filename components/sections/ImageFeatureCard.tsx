import type { LucideIcon } from "lucide-react";
import Image from "next/image";

export function ImageFeatureCard({
  icon: Icon,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-stone-300 bg-white transition-colors hover:border-ink">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Icon className="h-6 w-6 text-flame-ink" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-xl font-semibold text-ink">{title}</h3>
        <p className="mt-2 leading-relaxed text-stone-600">{description}</p>
      </div>
    </article>
  );
}
