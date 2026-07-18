# CLAUDE.md — Dépôt frontend BAMFA

Dépôt **frontend** de la plateforme BAMFA (Next.js App Router, TypeScript). Fait partie d'un ensemble de trois dépôts : `workspace` (orchestration + docs), `backend`, `frontend`.

## Git / Commits

- **Ne jamais mentionner Claude, l'IA ou un assistant dans les messages de commit.** Pas de `Co-Authored-By: Claude`, pas de « Generated with… ».
- Messages de commit en **français** (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`).
- Une branche par slice / zone (`feat/<zone>`), PR + revue avant merge sur `main`.

## Stack & conventions

- **Next.js 15 + React 19 + TypeScript**, App Router (`app/`), zones `(public)` / `(alumni)` / `(admin)`.
- Consomme l'API DRF du dépôt `backend` via le client typé `lib/api/` (types générés depuis le schéma OpenAPI : `npm run generate:api`).
- **TDD** : test qui échoue → implémentation minimale → test qui passe → commit (Vitest + Testing Library).
- Langue : **français** (UI, contenus, `<html lang="fr">`).
- Doc de référence d'architecture : voir le dépôt `workspace`, `docs/superpowers/specs/`.

## Lancer en local

- `npm run dev` (sert sur http://localhost:3000) · tests : `npm run test` · build : `npm run build`.
- Backend attendu sur http://localhost:8000/api/v1 (variable `NEXT_PUBLIC_API_BASE_URL`).
