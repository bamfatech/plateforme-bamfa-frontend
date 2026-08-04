import { Alert } from "@/components/ui/Alert";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/Table";
import { cardShell, monoLabel } from "@/components/ui/styles";
import type { ImportReport } from "@/lib/alumni/types";

export function ImportReportCard({ report }: { report: ImportReport }) {
  const compteurs = [
    { label: `${report.rows_total} ligne(s) lue(s)`, ton: "text-stone-700" },
    { label: `${report.rows_created} créé(s)`, ton: "text-success-text" },
    { label: `${report.rows_updated} mis à jour`, ton: "text-info-text" },
    { label: `${report.rows_skipped} sans changement`, ton: "text-stone-600" },
    { label: `${report.rows_failed} en erreur`, ton: "text-danger-text" },
  ];

  return (
    <article className={`${cardShell} flex flex-col gap-4 p-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-heading text-lg font-semibold text-ink">
          {report.filename || "Import"}
        </h3>
        <p className={`${monoLabel} text-stone-600`}>
          {new Date(report.created_at).toLocaleString("fr-FR")}
          {report.strict && " · mode strict"}
        </p>
      </div>

      {report.strict && (
        <Alert variant="warning">
          Mode « tout ou rien » : l'import a été interrompu à la première
          ligne invalide. Aucun profil n'a été créé ni mis à jour — les
          compteurs ci-dessous ne portent que sur les{" "}
          {report.rows_total} ligne(s) lue(s) avant l'interruption, pas sur le
          fichier entier.
        </Alert>
      )}

      <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
        {compteurs.map((compteur) => (
          <li key={compteur.label} className={compteur.ton}>
            {compteur.label}
          </li>
        ))}
      </ul>

      {report.uploaded_by_email && (
        <p className="text-xs text-stone-600">
          Importé par {report.uploaded_by_email}
        </p>
      )}

      {report.errors.length > 0 && (
        <Table caption={`Lignes en erreur de l'import ${report.filename}`}>
          <Thead>
            <Tr>
              <Th>Ligne</Th>
              <Th>Message</Th>
              <Th>Contenu</Th>
            </Tr>
          </Thead>
          <Tbody>
            {report.errors.map((erreur) => (
              <Tr key={erreur.id}>
                <Td>Ligne {erreur.line_number}</Td>
                <Td>{erreur.message}</Td>
                <Td>
                  <code className="font-mono text-xs text-stone-600">
                    {Object.entries(erreur.raw_row)
                      .map(([cle, valeur]) => `${cle}=${valeur}`)
                      .join(" · ")}
                  </code>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </article>
  );
}
