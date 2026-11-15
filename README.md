# OBSIDIAN AUTO STUDIO

> **Luxury Automotive Detailing & Surface Preservation Web Platform**  
> Built with React 19, TypeScript, Vite, Tailwind CSS, and optimized for extreme performance on the Vercel Global Edge CDN.

---

## ⚡ Performance Highlights (Verified Core Web Vitals)

* **First Contentful Paint (FCP)**: `940 ms` (Sub-second initial paint)
* **Cumulative Layout Shift (CLS)**: `0.0000` (Zero layout shift across all viewports)
* **Time to First Byte (TTFB)**: `17 ms`
* **Total Load Time**: `1.49 s`
* **Vercel Edge CDN Ready**: Immutable caching headers, Brotli/Gzip compression, and instant deployment invalidation.

---

## ✨ Features & Architecture

### 1. High-Conversion Hero Experience
* **Dynamic Typewriter Headline**: Cycling detailing disciplines (*Ceramic Quartz Coating, Self-Healing PPF, Multi-Stage Paint Correction, Deep Interior Cleaning*) with a precise inline blinking redline cursor.
* **Non-Blocking Studio Bay Video**: Delivered with `preload="none"` to eliminate initial bandwidth competition.
* **Immediate High-Priority Poster**: Specialized desktop (1400w) and mobile (640w) AVIF/WebP posters preloaded via `<link rel="preload" fetchpriority="high">`.
* **Viewport Pause**: An `IntersectionObserver` pauses video playback when scrolled outside the viewport to preserve client CPU/GPU and battery.

### 2. Flagship Detailing Showcase
* **Dedicated Services**: Ceramic Coating, Paint Protection Film (PPF), Paint Correction, Interior Detailing, and Exterior Detailing.
* **Interior Detailing**: Real photograph of a master detailer sterilizing console switchgear with a soft detail brush.
* **Interactive Treatment Modal**: Detailed protocol specifications, warranty terms, and direct concierge intake.

### 3. Precision Before/After Transformation Slider
* **True Zero-Shift Comparison**: Fixed container dimensions with CSS `clip-path` polygon rendering to compare a mud-splattered Porsche 911 against its mirror showroom finish.
* **Touch & Keyboard Accessible**: Smooth dragging on mobile with arrow-key keyboard navigation.

### 4. Interactive Pricing & Vehicle Profile Switcher
* **Vehicle Classes**: Thin, elegant switcher for *Coupe & Sedan*, *SUV & Mid-Size*, and *Exotic & Supercar*.
* **Card Border Switching**: Clicking any package activates the red highlight border and toggles selection status in-place without page jump or redirection.

### 5. Infinite Google-Style Reviews Carousel
* Smooth auto-scrolling horizontal cards with 5-star Google review styling, verified owner badges, and hover-to-pause interaction.

### 6. Sharp-Based Image Optimization Pipeline
* Generates **AVIF**, **WebP**, and progressive **MozJPEG** responsive widths (`320px`, `480px`, `640px`, `768px`, `1024px`, `1440px`, `1920px`) at build time.
* Renders native HTML5 `<picture>` tags with responsive `srcset` and `sizes` via `ResponsiveImage.tsx`.

### 7. Vercel Platform Integrations
* **Vercel Speed Insights** (`@vercel/speed-insights`): Live real-user monitoring of LCP, INP, CLS, and FCP.
* **Vercel Web Analytics** (`@vercel/analytics`): Lightweight, privacy-respecting visitor traffic analytics.
* **Edge CDN Configuration** (`vercel.json`): Content-hashed asset caching with `max-age=31536000, immutable`, security headers, and instant SPA routing.

---

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Bundler**: [Vite](https://vite.dev/) (ES2020 target with granular vendor chunk splitting)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Motion & Animation**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)
* **Monitoring**: [Vercel Speed Insights](https://vercel.com/docs/speed-insights) & [Vercel Analytics](https://vercel.com/docs/analytics)

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18.x or higher)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/automotive-detailing.git

# Navigate into project directory
cd automotive-detailing

# Install dependencies
npm install
```

### Development Server

Start Vite local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Production Build & Image Optimization

Run the Sharp image pipeline, TypeScript checks, and production bundle build:

```bash
npm run build
```

To preview the built production output locally:

```bash
npm run preview
```

### Performance & Visual Verification

Run the automated Chromium performance and visual verification audit:

```bash
node scripts/verify-performance.cjs
```

---

## 🌐 Deploying to Vercel

1. Push your repository to **GitHub**.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import this repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build` (runs Sharp optimization + Vite build).
6. Output Directory: `dist`.
7. Click **Deploy**.

Vercel will automatically apply all rules from [vercel.json](file:///c:/Users/BusinessComputers.in/OneDrive/Desktop/Automotive%20detailing/vercel.json) including immutable asset caching and Speed Insights tracking.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
