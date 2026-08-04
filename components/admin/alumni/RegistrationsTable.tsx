"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import type { Registration } from "@/lib/alumni/types";

interface Props {
  registrations: Registration[];
  onApprove: (id: number) => void;
  onReject: (registration: Registration) => void;
  pending: boolean;
}

function dateCourte(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function RegistrationsTable({
  registrations,
  onApprove,
  onReject,
  pending,
}: Props) {
  return (
    <Table caption="Demandes d'inscription alumni">
      <Thead>
        <Tr>
          <Th>Demandeur</Th>
          <Th>Contact</Th>
          <Th>Promotion</Th>
          <Th>Soumise le</Th>
          <Th>Statut</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {registrations.map((registration) => (
          <Tr key={registration.id}>
            <Td>
              <span className="font-medium">
                {registration.last_name} {registration.first_name}
              </span>
              {registration.sector_display && (
                <span className="mt-1 block text-xs text-stone-600">
                  {registration.sector_display}
                </span>
              )}
            </Td>
            <Td>
              <span className="block font-mono text-xs">{registration.email}</span>
              <span className="block text-xs text-stone-600">
                {[registration.city, registration.country]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </Td>
            <Td>{registration.promotion}</Td>
            <Td>{dateCourte(registration.submitted_at)}</Td>
            <Td>
              <div className="flex flex-col items-start gap-1">
                <Badge>{registration.status_display}</Badge>
                {registration.rejection_reason && (
                  <span className="text-xs text-stone-600">
                    {registration.rejection_reason}
                  </span>
                )}
              </div>
            </Td>
            <Td>
              {registration.status === "en_attente" && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={pending}
                    onClick={() => onApprove(registration.id)}
                  >
                    Approuver
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={pending}
                    onClick={() => onReject(registration)}
                  >
                    Rejeter
                  </Button>
                </div>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
