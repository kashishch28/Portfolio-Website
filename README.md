# Portfolio Website

A personal portfolio website built with React, Vite and Tailwind CSS.

## Tech stack

- Framework: React (JSX)
- Bundler: Vite
- Styling: Tailwind CSS, PostCSS

## Prerequisites

- Node.js (16+ recommended)
- npm (or yarn)

## Setup & local development

1. Clone the repository

   git clone https://github.com/your-username/Portfolio-Website.git
2. Change directory

   cd Portfolio-Website
3. Install dependencies

   npm install
4. Start the development server

   npm run dev

Open the URL shown by Vite (typically http://localhost:5173).

## Build & preview

- Build for production:

  npm run build
- Preview the production build locally:

  npm run preview

## Project structure (important files)

- `index.html` — app entry HTML
- `vite.config.js` — Vite config
- `tailwind.config.js` — Tailwind config
- `postcss.config.cjs` — PostCSS config
- `src/` — source code
  - `main.jsx` — React entry
  - `App.jsx` — root app component
  - `assets/` — images and static assets
  - `components/Portfolio.jsx` — portfolio section component

## Deployment

This site can be deployed on Vercel, Netlify, or any static host that supports SPA builds.

- Build command: `npm run build`
- Publish directory: `dist`

Live demo: https://portfoliowebsitek.netlify.app

## Customization

- Edit components inside `src/components` to change content.
- Update styles in `src/index.css` / `src/App.css` and Tailwind config.

## Contributing

Feel free to open issues or PRs. For small edits (content, typos), create a branch and submit a pull request.

## License

MIT — feel free to replace with your preferred license.

## Author

Your Name — update this with your name and contact info.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
