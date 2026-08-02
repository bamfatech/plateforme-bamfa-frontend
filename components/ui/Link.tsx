import NextLink from "next/link";
import type { ComponentProps } from "react";

export function Link({ className = "", ...props }: ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={`rounded-sm text-flame-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame ${className}`}
      {...props}
    />
  );
}
