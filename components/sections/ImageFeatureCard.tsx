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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
          <Icon className="h-6 w-6 text-primary-700" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-heading text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-stone-600">{description}</p>
      </div>
    </article>
  );
}
