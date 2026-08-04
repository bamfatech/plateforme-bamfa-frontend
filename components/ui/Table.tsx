import type { ReactNode, TableHTMLAttributes } from "react";

import { monoLabel } from "./styles";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Décrit la table pour les lecteurs d'écran. Rendu visuellement masqué. */
  caption: string;
  children: ReactNode;
}

export function Table({ caption, children, className = "", ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-sm border border-stone-300 bg-white">
      <table className={`w-full border-collapse text-sm ${className}`} {...props}>
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return <thead className="border-b border-stone-300 bg-stone-100">{children}</thead>;
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-stone-200">{children}</tbody>;
}

export function Tr({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th scope="col" className={`${monoLabel} px-4 py-3 text-left text-stone-600`}>
      {children}
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return <td className="px-4 py-3 align-middle text-ink">{children}</td>;
}
