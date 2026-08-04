import { Badge } from "@/components/ui/Badge";
import { cardShell, monoLabel } from "@/components/ui/styles";
import type { DirectoryEntry } from "@/lib/alumni/types";

export function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  const poste = [entry.current_position, entry.organization]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={`${cardShell} flex flex-col gap-3 p-5`}>
      <div>
        <h3 className="font-heading text-lg font-semibold text-ink">
          {entry.first_name} {entry.last_name}
        </h3>
        <p className={`${monoLabel} mt-1 text-stone-600`}>
          Promotion {entry.promotion}
        </p>
      </div>
      {poste && <p className="text-sm text-stone-700">{poste}</p>}
      {entry.bio && <p className="text-sm text-stone-600">{entry.bio}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {entry.sector_display && <Badge>{entry.sector_display}</Badge>}
        <span className="text-xs text-stone-600">
          {[entry.city, entry.country].filter(Boolean).join(", ")}
        </span>
      </div>
      {entry.linkedin_url && (
        <a
          href={entry.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-flame-ink underline-offset-4 hover:underline"
        >
          Profil LinkedIn
        </a>
      )}
    </article>
  );
}
