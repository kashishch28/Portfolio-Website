<div align="center">

# ✦ Kashish's Portfolio

### Personal portfolio website built with React + Vite + Tailwind CSS

[![Live Demo](https://img.shields.io/badge/Live%20Demo-portfoliowebsitek.netlify.app-brightgreen?style=flat-square&logo=netlify&logoColor=white)](https://portfoliowebsitek.netlify.app)
![JavaScript](https://img.shields.io/badge/JavaScript-98.1%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

</div>

---

## Overview

A clean, responsive personal portfolio website to showcase projects, skills, and contact information. Built with a modern frontend stack — React for the UI, Vite for lightning-fast development, and Tailwind CSS for styling.

🌐 **Live:** [portfoliowebsitek.netlify.app](https://portfoliowebsitek.netlify.app)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 (JSX) | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| PostCSS | CSS processing |
| ESLint | Code linting |
| Netlify | Deployment & hosting |

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm (or yarn)

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/kashishch28/Portfolio-Website.git
cd Portfolio-Website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement enabled.

### Build for Production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## Project Structure

```
Portfolio-Website/
├── public/               # Static assets (favicon, images)
├── src/
│   ├── components/
│   │   └── Portfolio.jsx # Main portfolio section component
│   ├── assets/           # Images and static resources
│   ├── App.jsx           # Root app component
│   ├── App.css           # Global app styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind base imports
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.cjs    # PostCSS configuration
└── eslint.config.js      # ESLint configuration
```

---

## Customization

Want to use this as a base for your own portfolio? Here's where to make changes:

- **Content** — edit `src/components/Portfolio.jsx` to update your name, bio, projects, and skills
- **Styling** — tweak `tailwind.config.js` for custom colors/fonts, or add classes directly in components
- **Global CSS** — `src/index.css` and `src/App.css` for any overrides outside Tailwind
- **Assets** — drop images/icons into `src/assets/` or `public/`

---

## Deployment

The site is deployed on **Netlify**. To deploy your own fork:

1. Push your repo to GitHub
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
3. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click Deploy

Works equally well on **Vercel** or any static host.

---

## Contributing

Found a bug or want to suggest an improvement? Feel free to open an issue or submit a pull request.

```bash
git checkout -b fix/your-fix
git commit -m "fix: description"
git push origin fix/your-fix
# then open a PR on GitHub
```

---

## License

MIT — fork it, customize it, make it yours.

---

<div align="center">
Made by <a href="https://github.com/kashishch28">kashishch28</a> &nbsp;·&nbsp; <a href="https://portfoliowebsitek.netlify.app">Live Demo</a>
</div>
