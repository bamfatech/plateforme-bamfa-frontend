"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import type { AdminProfile, ProfileAction } from "@/lib/alumni/types";

interface Props {
  profiles: AdminProfile[];
  onAction: (id: number, action: ProfileAction) => void;
  pending: boolean;
}

export function ProfilesTable({ profiles, onAction, pending }: Props) {
  return (
    <Table caption="Profils alumni">
      <Thead>
        <Tr>
          <Th>Alumni</Th>
          <Th>Contact</Th>
          <Th>Promotion</Th>
          <Th>Statut</Th>
          <Th>Complétude</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {profiles.map((profile) => (
          <Tr key={profile.id}>
            <Td>
              <span className="font-medium">
                {profile.last_name} {profile.first_name}
              </span>
              {profile.sector_display && (
                <span className="mt-1 block text-xs text-stone-600">
                  {profile.sector_display}
                </span>
              )}
            </Td>
            <Td>
              <span className="block font-mono text-xs">{profile.email}</span>
              {profile.phone && (
                <span className="block text-xs text-stone-600">{profile.phone}</span>
              )}
            </Td>
            <Td>{profile.promotion}</Td>
            <Td>
              <div className="flex flex-col items-start gap-1">
                <Badge>{profile.status_display}</Badge>
                {!profile.has_account && (
                  <span className="text-xs text-stone-600">Sans compte</span>
                )}
              </div>
            </Td>
            <Td>{profile.completeness} %</Td>
            <Td>
              <div className="flex flex-wrap gap-2">
                {profile.status === "actif" ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={pending}
                    onClick={() => onAction(profile.id, "suspendre")}
                  >
                    Suspendre
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={pending}
                    onClick={() => onAction(profile.id, "reactiver")}
                  >
                    Réactiver
                  </Button>
                )}
                {profile.status !== "archive" && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={pending}
                    onClick={() => onAction(profile.id, "archiver")}
                  >
                    Archiver
                  </Button>
                )}
                {!profile.has_account && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={pending}
                    onClick={() => onAction(profile.id, "inviter")}
                  >
                    Inviter
                  </Button>
                )}
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
