"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ApiError, api } from "@/lib/api/client";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Link } from "@/components/ui/Link";
import { Spinner } from "@/components/ui/Spinner";

interface Identite {
  first_name: string;
  email: string;
}

interface ReponseActivation {
  created: boolean;
  detail: string;
}

/** Extrait le premier message d'un champ du format d'erreur normalisé de l'API. */
function messageApi(erreur: unknown, champ: string, repli: string): string {
  if (erreur instanceof ApiError) {
    const details = (erreur.data as { error?: { details?: Record<string, string[]> } })
      ?.error?.details;
    const messages = details?.[champ];
    if (messages?.length) return messages[0];
  }
  return repli;
}

export function ActivationForm({ token }: { token: string | null }) {
  const router = useRouter();
  const [identite, setIdentite] = useState<Identite | null>(null);
  const [erreurJeton, setErreurJeton] = useState("");
  const [verification, setVerification] = useState(true);
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreurMotDePasse, setErreurMotDePasse] = useState("");
  const [erreurConfirmation, setErreurConfirmation] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [compteExistant, setCompteExistant] = useState("");

  useEffect(() => {
    if (!token) {
      setErreurJeton(
        "Ce lien d'activation est incomplet. Ouvrez-le depuis l'e-mail que vous avez reçu.",
      );
      setVerification(false);
      return;
    }
    let annule = false;
    async function verifier() {
      try {
        const { data } = await api.post<Identite>(
          "/alumni/invitation/verifier/",
          { token },
        );
        if (!annule) setIdentite(data);
      } catch (erreur) {
        if (!annule)
          setErreurJeton(
            messageApi(
              erreur,
              "token",
              "Ce lien d'invitation est invalide ou a expiré.",
            ),
          );
      } finally {
        if (!annule) setVerification(false);
      }
    }
    verifier();
    return () => {
      annule = true;
    };
  }, [token]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErreurMotDePasse("");
    setErreurConfirmation("");
    if (!motDePasse) {
      setErreurMotDePasse("Le mot de passe est requis.");
      return;
    }
    if (motDePasse !== confirmation) {
      setErreurConfirmation("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setEnvoi(true);
    try {
      const { data } = await api.post<ReponseActivation>(
        "/alumni/invitation/activer/",
        { token, password: motDePasse },
      );
      if (data.created) {
        router.push("/connexion");
      } else {
        setCompteExistant(data.detail);
      }
    } catch (erreur) {
      setErreurMotDePasse(
        messageApi(
          erreur,
          "password",
          messageApi(
            erreur,
            "token",
            "L'activation a échoué. Veuillez réessayer.",
          ),
        ),
      );
    } finally {
      setEnvoi(false);
    }
  }

  if (verification) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8 text-flame-ink" />
      </div>
    );
  }

  if (erreurJeton) {
    return <Alert variant="danger">{erreurJeton}</Alert>;
  }

  if (compteExistant) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="info">{compteExistant}</Alert>
        <Link href="/connexion" className="self-start">
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <p className="font-heading text-2xl font-semibold text-ink">
          Bonjour {identite?.first_name}
        </p>
        <p className="mt-2 text-sm text-stone-600">
          Choisissez un mot de passe pour activer l'accès associé à{" "}
          <span className="font-mono text-ink">{identite?.email}</span>.
        </p>
      </div>

      <Field
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        error={erreurMotDePasse}
      />
      <Field
        label="Confirmation"
        type="password"
        autoComplete="new-password"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        error={erreurConfirmation}
      />

      <Button type="submit" loading={envoi} className="self-start">
        Activer mon accès
      </Button>
    </form>
  );
}
