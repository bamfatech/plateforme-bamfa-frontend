"use client";

import { useState } from "react";

import { GENDER_OPTIONS, PROMOTION_MIN, SECTOR_OPTIONS, promotionMax } from "@/content/alumni";
import { ApiError, api } from "@/lib/api/client";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const VIDE = {
  first_name: "",
  last_name: "",
  email: "",
  promotion: "",
  country: "Bénin",
  phone: "",
  city: "",
  university: "",
  mcf_program: "",
  sector: "",
  current_position: "",
  organization: "",
  bio: "",
  linkedin_url: "",
  gender: "",
};

type Valeurs = typeof VIDE;
type Erreurs = Partial<Record<keyof Valeurs, string>>;

function extraireErreursApi(erreur: unknown): { champs: Erreurs; global: string } {
  if (erreur instanceof ApiError) {
    const details = (erreur.data as { error?: { details?: Record<string, string[]> } })
      ?.error?.details;
    if (details) {
      const champs: Erreurs = {};
      const messagesNonRattaches: string[] = [];
      for (const [champ, messages] of Object.entries(details)) {
        if (champ in VIDE) champs[champ as keyof Valeurs] = messages[0];
        else messagesNonRattaches.push(...messages);
      }
      if (Object.keys(champs).length > 0 || messagesNonRattaches.length > 0) {
        return { champs, global: messagesNonRattaches.join(" ") };
      }
    }
  }
  return {
    champs: {},
    global: "L'envoi a échoué. Veuillez réessayer dans quelques instants.",
  };
}

export function RegistrationForm() {
  const [valeurs, setValeurs] = useState<Valeurs>(VIDE);
  const [consentement, setConsentement] = useState(false);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  function set(champ: keyof Valeurs, valeur: string) {
    setValeurs((v) => ({ ...v, [champ]: valeur }));
  }

  function valider(): Erreurs {
    const e: Erreurs = {};
    if (!valeurs.first_name.trim()) e.first_name = "Le prénom est requis.";
    if (!valeurs.last_name.trim()) e.last_name = "Le nom est requis.";
    if (!valeurs.email.trim()) e.email = "L'e-mail est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.email))
      e.email = "Format d'e-mail invalide.";
    if (!valeurs.promotion.trim()) e.promotion = "La promotion est requise.";
    else {
      const annee = Number(valeurs.promotion);
      if (!Number.isInteger(annee) || annee < PROMOTION_MIN || annee > promotionMax())
        e.promotion = `Année de promotion invalide (entre ${PROMOTION_MIN} et ${promotionMax()}).`;
    }
    if (!valeurs.country.trim()) e.country = "Le pays est requis.";
    return e;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErreurGlobale("");
    const e = valider();
    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    setEnvoi(true);
    try {
      await api.post("/alumni/inscriptions/", {
        ...valeurs,
        promotion: Number(valeurs.promotion),
        directory_consent: consentement,
      });
      setEnvoye(true);
      setValeurs(VIDE);
      setConsentement(false);
    } catch (erreur) {
      const { champs, global } = extraireErreursApi(erreur);
      setErreurs(champs);
      setErreurGlobale(global);
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <Alert variant="success">
        Votre demande a bien été enregistrée. Vous recevrez un e-mail dès qu'elle
        aura été examinée par l'équipe BAMFA.
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {erreurGlobale && <Alert variant="danger">{erreurGlobale}</Alert>}

      <fieldset className="flex flex-col gap-4">
        <legend className="font-mono text-xs uppercase tracking-[0.15em] text-flame-ink">
          Identité
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Prénom"
            value={valeurs.first_name}
            onChange={(e) => set("first_name", e.target.value)}
            error={erreurs.first_name}
          />
          <Field
            label="Nom"
            value={valeurs.last_name}
            onChange={(e) => set("last_name", e.target.value)}
            error={erreurs.last_name}
          />
          <Field
            label="Adresse e-mail"
            type="email"
            value={valeurs.email}
            onChange={(e) => set("email", e.target.value)}
            error={erreurs.email}
          />
          <Field
            label="Téléphone"
            value={valeurs.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <Field
            label="Pays"
            value={valeurs.country}
            onChange={(e) => set("country", e.target.value)}
            error={erreurs.country}
          />
          <Field
            label="Ville"
            value={valeurs.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <Select
            label="Genre"
            options={GENDER_OPTIONS}
            placeholder="Non précisé"
            value={valeurs.gender}
            onChange={(e) => set("gender", e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-mono text-xs uppercase tracking-[0.15em] text-flame-ink">
          Parcours
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Promotion"
            type="number"
            inputMode="numeric"
            value={valeurs.promotion}
            onChange={(e) => set("promotion", e.target.value)}
            error={erreurs.promotion}
          />
          <Field
            label="Université"
            value={valeurs.university}
            onChange={(e) => set("university", e.target.value)}
          />
          <Field
            label="Programme MCF"
            value={valeurs.mcf_program}
            onChange={(e) => set("mcf_program", e.target.value)}
          />
          <Select
            label="Secteur d'activité"
            options={SECTOR_OPTIONS}
            placeholder="Non précisé"
            value={valeurs.sector}
            onChange={(e) => set("sector", e.target.value)}
          />
          <Field
            label="Poste actuel"
            value={valeurs.current_position}
            onChange={(e) => set("current_position", e.target.value)}
          />
          <Field
            label="Organisation"
            value={valeurs.organization}
            onChange={(e) => set("organization", e.target.value)}
          />
          <Field
            label="Profil LinkedIn"
            type="url"
            value={valeurs.linkedin_url}
            onChange={(e) => set("linkedin_url", e.target.value)}
          />
        </div>
        <Textarea
          label="Biographie"
          rows={4}
          value={valeurs.bio}
          onChange={(e) => set("bio", e.target.value)}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-mono text-xs uppercase tracking-[0.15em] text-flame-ink">
          Confidentialité
        </legend>
        <div className="flex items-start gap-3 text-sm text-stone-700">
          <input
            id="directory-consent"
            type="checkbox"
            checked={consentement}
            onChange={(e) => setConsentement(e.target.checked)}
            aria-describedby="directory-consent-hint"
            className="mt-0.5 h-4 w-4 rounded-sm border-ink/25 text-flame focus-visible:ring-2 focus-visible:ring-flame"
          />
          <div>
            <label htmlFor="directory-consent">
              J'accepte de figurer dans l'annuaire public des alumni BAMFA.
            </label>{" "}
            <span id="directory-consent-hint" className="text-stone-600">
              Mon adresse e-mail et mon téléphone ne seront jamais publiés. Ce
              choix est révocable à tout moment.
            </span>
          </div>
        </div>
      </fieldset>

      <Button type="submit" loading={envoi} className="self-start">
        Envoyer ma demande
      </Button>
    </form>
  );
}
