# Medail — Hustle Translator

**Hustle Translator** (*The Hustle Translator*) est une expérience web ludique dans l’univers du *Royaume des Mille Algorithmes*. Tu indiques ton rôle de développeur, tes années d’expérience et ton nom : la Guilde te décerne un **rang**, un **blason**, une **proclamation** et un titre de noblesse numérique à partager.

> Les rangs sont calculés à partir des années d’expérience (facteur principal) et personnalisés selon le rôle. C’est une célébration humoristique, pas une mesure objective de compétence.

## Fonctionnalités

- Parcours guidé : choix du rôle, curseur d’ancienneté (0–80 ans), forge du titre
- **10 niveaux** (*Écuyer* → *Souverain du Code*) avec logos SVG, couleurs, devise et cérémonie
- Révélation animée, confettis, fil de progression vers le rang suivant
- **Partage** par lien (`role`, `years`, `name`, optionnel `lang`)
- Copie du texte de proclamation pour les réseaux
- **Internationalisation** : français (données de base) et anglais (patch UI + contenu via `public/datas/i18n/en.json`)

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com) 4 (Turbopack) |
| Typographie | Google Fonts — Pirata One, Pixelify Sans |
| Effets | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |
| Langage | TypeScript |

## Démarrage

Prérequis : **Node.js** 20+ et npm (ou pnpm / yarn / bun).

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Autres commandes :

```bash
npm run build   # build de production
npm run start   # serveur après build
npm run lint    # ESLint (eslint-config-next)
```

## Structure du dépôt

```
app/                    # layout, page, styles globaux (hustle-template.css)
components/
  hustle/               # HustleTranslator, RankRoad, RevealPanel, ActionDock…
  i18n/                 # LocaleProvider, LanguageSwitcher
hooks/
  useHustleData.ts      # charge datas.json + patch de locale
lib/
  hustle/               # calcul du rang, partage URL, validation, messages
  i18n/                 # locales, messages UI, fusion des traductions
  types/                # types TypeScript (HustleData, HustleResult…)
public/
  datas/datas.json      # registre royal (rôles, rangs, lore) — source FR
  datas/i18n/en.json    # surcharge anglaise du contenu
  logos/                # blasons par niveau (level-01 … level-10)
scripts/
  generate-en-locale.mjs  # génère / met à jour en.json à partir de datas.json
```

## Données et contenu

Le cœur métier vit dans **`public/datas/datas.json`** (version projet `2.0.0` dans le fichier). Les règles d’évaluation, les options de rôle, les rangs (seuils `minYears` / `maxYears`), proclamations et métadonnées des blasons y sont déclarés.

Au runtime, l’app charge ce JSON puis applique le patch de locale (`mergeLocaleData`) et les messages UI (`lib/i18n/messages/`). La préférence de langue est persistée côté client (`localeStorage`).

Pour régénérer le patch anglais après modification du registre :

```bash
node scripts/generate-en-locale.mjs
```

## Partage de profil

Exemple d’URL :

```
http://localhost:3000/?role=fullstack&years=5&name=Jean%20Dupont&lang=en
```

Les paramètres inconnus ou invalides sont ignorés ou normalisés selon la logique dans `lib/hustle/shareUrl.ts`.

## Déploiement

Application Next.js standard : build (`npm run build`) puis exécution de `npm run start` sur la plateforme de ton choix (Vercel, Render, etc.). Les fichiers sous `public/` sont servis tels quels ; aucune base de données n’est requise.

## Licence

Projet privé (`"private": true` dans `package.json`). Adapter selon la politique de ton organisation si tu ouvres le dépôt.
