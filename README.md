# Cyna Web (Frontend)

This is the front-end codebase for the Cyna e-commerce. It is built using React 19, TypeScript, and Vite with modern UI components, internationalization, responsive design, and full admin and customer views.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Deployment](#deployment)
- [Collaborators](#collaborators)

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

You can verify your versions with:

```bash
node -v
npm -v
```

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Tiffany-Dby/b3pe-cyna-web.git
cd b3pe-cyna-web
npm install
```

Add environments variables:

```bash
VITE_STRIPE_PUBLIC_KEY=
VITE_API_URL=
VITE_CRISP_TOKEN=
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the app.

---

## Available scripts

All scripts are invoked via `npm run <script>` and configured in `package.json` :

| Script    | Description                                                         |
| --------- | ------------------------------------------------------------------- |
| `dev`     | Starts Vite dev server on `localhost:5173`                          |
| `build`   | Runs `tsc -b && vite build` then builds production bundle with Vite |
| `lint`    | Lints `.ts`/`.tsx` files with ESLint                                |
| `preview` | Serves the production build locally via `vite preview`              |

---

## Project structure

```bash
├── public/                 # Static assets (fonts, images)
├── src/                    # Application source code
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   ├── shared/             # Shared modules (i18n, assets, routes, UI primitives)
│   ├── lib/                # Reusable components, hooks, utils from libraries (ShadCN, etc.)
│   ├── categories/         # Categories feature
│   ├── products/           # Product listings and admin
│   ├── dashboard/          # Charts and dashboard view
│   ├── home/               # Home page and promotions
│   ├── purchase/           # Purchase funnel (Cart, Adress, Checkout, etc.)
│   └── users/              # Authentication and user settings
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.*.json
└── vite.config.ts
```

---

## Tech stack

- Framework: React 19
- Bundler: Vite
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI Components: ShadCN/ui (Radix UI, lucide-react, sonner, recharts, tanstack)
- State management: Zustand
- Forms & validation: React Hook Form , Zod
- Routing: React router v7
- Internationalization: i18next
- Payments: Stripe
- Linting: ESlint
- API: Custom REST API (via `shared/tools/api`)

---

## Features

- Dashboard with sales and revenue charts (daily/weekly)
- Admin panels for managing categories, products, promotions, and user subscriptions
- Home view showcasing promotions carousel and best-selling product
- Shopping cart, checkout funnel, and order success pages
- Theme toggle (light/dark/system) with persisted preference
- Responsive design (mobile-first) with mobile-friendly sidebar
- Toast notifications for API actions
- Multi-language support (English and French)

---

## Deployment

Deployment on Vercel

1. Connect your repository

- Log in to Vercel and click New Project → Import Git Repository
- Select the `b3pe-cyna-web` repository from your Git provider

2. Configure build settings

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

3. Configure Environment variables

- In the Vercel dashboard, under Settings → Environment Variables
- Add the following keys with their corresponding values from your local .env:
  ```bash
  VITE_STRIPE_PUBLIC_KEY=
  VITE_API_URL=
  VITE_CRISP_TOKEN=
  ```

4. Delpoy & preview

- Click 'Deploy' → Vercel will build and publish your site (domain name can also be changed)
- Subsequent pushes to your main (or production) branch will automatically trigger new deployments

---

## Collaborators

This project was developed as the final assignment for our course.

Contributors:

[![GITHUB](https://img.shields.io/badge/Mathéo-expert?style=&logo=GITHUB&logoColor=fefefe&labelColor=222529&color=222529)](https://github.com/matheo-dlvt)
[![GITHUB](https://img.shields.io/badge/Quentin-expert?style=&logo=GITHUB&logoColor=fefefe&labelColor=222529&color=222529)](https://github.com/Kant1-18)
[![GITHUB](https://img.shields.io/badge/Tiffany-expert?style=&logo=GITHUB&logoColor=fefefe&labelColor=222529&color=222529)](https://github.com/Tiffany-Dby)
