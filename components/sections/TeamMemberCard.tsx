import Image from "next/image";

import { FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

type Member = {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
  linkedin?: string;
  facebook?: string;
};

export function TeamMemberCard({ member }: { member: Member }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-stone-300 bg-white transition-colors hover:border-ink">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {member.bio && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <p className="p-5 text-sm leading-relaxed text-paper">{member.bio}</p>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-ink">{member.name}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-flame-ink">
          {member.role}
        </p>
        {(member.linkedin || member.facebook) && (
          <div className="mt-4 flex gap-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-stone-300 text-stone-600 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
            {member.facebook && (
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook de ${member.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-stone-300 text-stone-600 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
