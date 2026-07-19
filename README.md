# Plateforme BAMFA — Frontend

Application web de la plateforme **BAMFA** (Benin Association of the Mastercard Foundation Alumni) : site public et espace d'administration, construite avec **Next.js** (App Router, TypeScript).

## Stack

- Node 22 · Next.js 15 · React 19 · TypeScript 5
- **Tailwind CSS v4** (design tokens en variables CSS) · polices **Poppins** (titres) + **Inter** (corps)
- Client HTTP **axios** (cookies httpOnly + CSRF)
- Tests : **Vitest** + Testing Library

## Prérequis

- **Node 22**
- L'**API BAMFA** accessible (par défaut `http://localhost:8000/api/v1`, configurable via `NEXT_PUBLIC_API_BASE_URL`).

## Installation (dev local)

```bash
# 1. Dépendances
npm install

# 2. Variables d'environnement
cp .env.example .env        # puis ajuster NEXT_PUBLIC_API_BASE_URL si besoin

# 3. Serveur de développement
npm run dev
```

L'application est servie sur `http://localhost:3000/`.

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer le build de production |
| `npm run test` | Tests (Vitest) |
| `npm run lint` | Lint (next lint) |
| `npm run generate:api` | Génère les types TypeScript depuis le schéma OpenAPI de l'API |

## Authentification (à savoir)

- L'auth repose sur des **cookies httpOnly** (jamais lus par le JS). Le client axios (`lib/api/client.ts`) envoie les cookies (`withCredentials`), ajoute l'en-tête `X-CSRFToken` sur les requêtes non sûres, et rafraîchit automatiquement le token sur `401`.
- En cross-origin (dev), le token CSRF est récupéré via l'endpoint dédié de l'API.

## Structure

```
frontend/
├── app/
│   ├── layout.tsx           # layout racine (polices, styles globaux)
│   └── (public)/            # zone publique (layout header/footer + pages)
├── components/
│   ├── ui/                  # design system (Button, Field, Card, Alert, …)
│   └── layout/              # Header, Footer
├── lib/api/                 # client axios + types générés (OpenAPI)
└── public/                  # assets (logo, images)
```

## Conventions

- Voir **`CLAUDE.md`** à la racine du dépôt.
- Messages de commit en **français**, **sans mention d'IA/assistant**.
- **TDD** : test qui échoue → implémentation minimale → test qui passe → commit.
- Une branche par fonctionnalité (`feat/<zone>`), PR + revue avant merge sur `main`.
- **Accessibilité** : contrastes WCAG AA, focus visibles, HTML sémantique.
