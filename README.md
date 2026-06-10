# RightClicks — Managed IT. Built for Growth.

Production-grade marketing website for RightClicks, a managed IT service provider. Built with React, Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

---

## Tech Stack

| Tool             | Version | Purpose                      |
| ---------------- | ------- | ---------------------------- |
| React            | 18      | UI framework                 |
| Vite             | 5       | Build tool & dev server      |
| Tailwind CSS     | 3       | Utility-first styling        |
| Framer Motion    | 11      | Declarative animations       |
| GSAP             | 3       | Timeline & scroll animations |
| Lenis            | 1       | Smooth scroll                |
| React Icons      | 5       | Icon library                 |
| React Router DOM | 6       | Client-side routing          |

---

## Project Structure

```
rightclicks/
├── public/
│   └── favicon.svg
├── src/
│   ├── animations/
│   │   └── variants.js          # Reusable Framer Motion variants
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── WhyChooseUsSection.jsx
│   │   │   ├── ProcessSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── ReviewsSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useLenis.js           # Smooth scroll init + scrollToSection()
│   │   └── useScrolled.js        # Navbar scroll-aware state
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                 # Global styles + Tailwind layers
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-org/rightclicks.git
cd rightclicks

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Design System

All design tokens live in `tailwind.config.js`. Key values:

### Colors

| Token              | Hex       | Usage                            |
| ------------------ | --------- | -------------------------------- |
| `brand-blue`       | `#1E90FF` | Primary accent, CTAs, highlights |
| `brand-blue-light` | `#4DAAFF` | Hover states                     |
| `dark-900`         | `#050A14` | Page background                  |
| `dark-800`         | `#080E1C` | Section alternates               |
| `dark-700`         | `#0C1424` | Card backgrounds                 |
| `neutral-200`      | `#C8D4F0` | Body text                        |
| `neutral-300`      | `#A0B0D8` | Secondary text                   |

### Reusable Classes (index.css)

| Class                 | Description                         |
| --------------------- | ----------------------------------- |
| `.btn-primary`        | Blue filled CTA button with glow    |
| `.btn-ghost`          | Outlined ghost button               |
| `.glass-card`         | Dark glass-morphism card            |
| `.eyebrow`            | Small uppercase section label       |
| `.section-heading`    | Large responsive section title      |
| `.section-py`         | Consistent vertical section padding |
| `.text-gradient-blue` | Blue gradient text fill             |
| `.glow-blue`          | Drop shadow glow filter             |

### Animation Variants (src/animations/variants.js)

| Export                       | Effect                                     |
| ---------------------------- | ------------------------------------------ |
| `fadeInUp`                   | Fade + rise from below                     |
| `fadeInLeft` / `fadeInRight` | Fade + slide from side                     |
| `fadeIn`                     | Simple opacity fade                        |
| `scaleIn`                    | Scale up from 85%                          |
| `staggerContainer()`         | Parent wrapper for staggered children      |
| `viewportOnce`               | Trigger animation once on scroll into view |

---

## Build Phases

The site was developed in structured phases:

| Phase | Section                                            |
| ----- | -------------------------------------------------- |
| 1     | Foundation — Navbar, routing, theme, smooth scroll |
| 2     | Hero — Animated globe, floating cards, stats, CTA  |
| 3     | About Us + Why Choose Us                           |
| 4     | Our Process — GSAP scroll timeline                 |
| 5     | Services grid                                      |
| 6     | Reviews carousel                                   |
| 7     | Contact form + Footer                              |
| 8     | Performance, accessibility, SEO polish             |
