# Bappaditya Kuilya — Portfolio

An ultra-premium cinematic portfolio website for Bappaditya Kuilya.

## 🌸 Design Philosophy

- **Elegant** — Calm, disciplined, minimal
- **Atmospheric** — Sakura petals, moonlight bloom, cinematic glow
- **Premium** — Glassmorphism, luxury typography, refined motion
- **Professional** — AI Systems Engineer portfolio with artistic styling

## 🎨 Visual Style

- Dark cinematic UI with sakura pink accents
- Falling cherry blossom particles (Canvas API)
- Glassmorphism cards with subtle borders
- Moonlight bloom and ambient aura effects
- Japanese typography overlays
- Smooth parallax and spring physics animations

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd byakuya-portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Contact Form

The contact form uses Formspree. Create a form in Formspree, copy its endpoint, and add it to `.env.local`:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

For Vercel deployment, add the same value as an environment variable named `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
byakuya-portfolio/
├── app/
│   ├── components/       # Reusable components
│   │   ├── SakuraParticles.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Journey.tsx
│   │   ├── Skills.tsx
│   │   ├── Resume.tsx
│   │   └── Contact.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── images/           # Background images
├── lib/
│   └── utils.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 🎭 Sections

1. **Hero** — Cinematic opening with giant typography and atmospheric portrait area
2. **About** — Luxury editorial bio with info cards
3. **Projects** — GitHub-powered project arsenal with live public activity
4. **Journey** — Timeline of education and achievements
5. **Skills** — Premium grid with animated progress bars
6. **Resume** — Interactive resume viewer with download
7. **Contact** — Minimal luxury contact form

## 🌸 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode only (elegant black/pink theme)
- ✅ Smooth scroll navigation
- ✅ Canvas-based sakura particle system
- ✅ Glassmorphism UI elements
- ✅ Framer Motion spring animations
- ✅ Interactive hover effects
- ✅ Resume preview modal
- ✅ Contact form with validation
- ✅ Optimized for Vercel deployment

## 📝 License

© 2025 Bappaditya Kuilya. All rights reserved.
