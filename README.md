# VoteWise Elite — AI-Powered Election Assistant 🗳️

A state-of-the-art, full-stack civic engagement platform empowering Indian citizens with AI-driven election insights, candidate comparisons, voter registration guides, and real-time election data — all built with enterprise-grade security and accessibility.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Lint code
npm run lint

# Production build
npm run build
```

---

## 🏗️ Architecture Overview

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Google Analytics & a11y
│   ├── page.tsx            # Landing page
│   ├── accessibility/      # WCAG 2.1 AA compliance page
│   ├── admin/dashboard/    # Admin panel (role-protected)
│   ├── ai-assistant/       # AI-powered election chatbot
│   ├── candidates/         # Candidate explorer with filters
│   ├── contact/            # Contact form (rate-limited, sanitized)
│   ├── eligibility/        # Voter eligibility checker
│   ├── interactive-guide/  # Step-by-step voter guide
│   └── ...                 # Additional feature pages
├── components/
│   ├── layout/             # Navbar, Footer, LanguageSwitcher
│   ├── sections/           # HeroSection, FeatureShowcase, etc.
│   └── theme-provider.tsx  # Dark/light theme management
├── context/
│   └── LanguageContext.tsx  # i18n with 6 languages (en/ta/hi/te/kn/ml)
├── lib/
│   ├── index.ts            # Barrel exports for clean imports
│   ├── utils.ts            # Tailwind class merger utility
│   ├── mock-db.ts          # Type-safe mock database (42 candidates, 20 parties)
│   ├── auth-context.tsx    # Authentication context (user/admin roles)
│   ├── security.ts         # XSS prevention, rate limiting, CSRF, safe storage
│   ├── performance.ts      # Web Vitals, debounce, throttle, preloading
│   ├── google-services.ts  # Firebase Analytics, Firestore, reCAPTCHA, Maps
│   ├── *.test.ts           # Comprehensive test suites
│   └── ...
├── locales/                # Translation files (6 languages)
└── types/                  # TypeScript type definitions
```

---

## ☁️ Google Services Integration

| Service | Usage | File |
|---------|-------|------|
| **Google Analytics (gtag.js)** | Page views, user engagement events, form submissions | `layout.tsx`, `google-services.ts` |
| **Firebase Analytics** | Custom event tracking (candidate views, guide completion) | `google-services.ts` |
| **Cloud Firestore** | Structured NoSQL service layer for contacts, feedback, analytics | `google-services.ts` |
| **Google reCAPTCHA v3** | Bot protection on contact form submissions | `google-services.ts`, `contact/page.tsx` |
| **Google Maps Embed API** | Election Commission location, polling booth locator | `contact/page.tsx` |
| **Google Fonts (Inter)** | Zero-layout-shift typography via `next/font/google` | `layout.tsx` |

### Configuration

All Google service keys are configured via environment variables (see `.env.example`):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_MAPS_KEY="your-maps-key"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-key"
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-key"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
```

---

## 🧪 Testing

Comprehensive test suite with **50+ test cases** across:

| Module | Tests | Coverage |
|--------|-------|----------|
| `utils.test.ts` | Class merger edge cases, empty inputs, conditional classes | Core utilities |
| `mock-db.test.ts` | Data integrity, unique IDs, filtering, type validation | Data layer |
| `security.test.ts` | XSS prevention, rate limiting, CSRF tokens, localStorage | Security |
| `performance.test.ts` | Debounce/throttle with timer mocks, argument passing | Performance |
| `google-services.test.ts` | Analytics, Firestore CRUD, Maps URL generation | Google integration |

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

---

## ⚡ Performance Optimizations

- **Web Vitals Monitoring**: LCP, FCP, CLS, TTFB tracking via Performance Observer API
- **Resource Hints**: `dns-prefetch` and `preconnect` for Google services, fonts, CDN
- **Memoization**: `useMemo` for expensive candidate filtering (40+ entries)
- **Code Splitting**: Next.js App Router automatic route-based chunking
- **Dynamic Imports**: `react-confetti` loaded only when needed via `next/dynamic`
- **Image Optimization**: `next/image` with remote patterns for LCP optimization
- **Debounce/Throttle**: Search input debouncing, scroll event throttling

---

## 🔒 Security Implementation

### Defense-in-Depth Strategy

| Layer | Implementation |
|-------|---------------|
| **HTTP Headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy |
| **XSS Prevention** | HTML entity escaping via `sanitizeInput()`, React JSX auto-escaping |
| **Input Validation** | Email RFC 5322 validation, dangerous pattern detection, `maxLength` attributes |
| **Rate Limiting** | Sliding window algorithm (5 req/min) on form submissions |
| **CSRF Protection** | Cryptographic token generation with constant-time validation |
| **Safe Storage** | Error-boundary wrapped localStorage with graceful fallbacks |
| **Content Policy** | Strict CSP with whitelisted domains for scripts, styles, and frames |
| **Transport Security** | HSTS with 2-year max-age, includeSubDomains, preload directive |

### Security Headers (via `next.config.mjs`)

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com ...
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

---

## 📐 Code Quality

- **TypeScript**: Strict typing with explicit interfaces (`Candidate`, `Party`, `FirestoreDocument`)
- **JSDoc Documentation**: All utility functions documented with `@param`, `@returns`, `@example`
- **Barrel Exports**: Clean imports via `@/lib` central export
- **Linting**: ESLint configured with Next.js rules, zero warnings
- **Separation of Concerns**: Data (mock-db) → Services (google-services) → Context (auth/i18n) → UI (components)
- **DRY Patterns**: Shared utilities, reusable components, consistent theming via CSS variables

---

## ♿ Accessibility (WCAG 2.1 AA)

| Feature | Implementation |
|---------|---------------|
| **Skip Navigation** | Skip-to-content link for keyboard users |
| **Semantic HTML** | `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>` |
| **ARIA Labels** | All buttons, toggles, modals, and interactive elements labeled |
| **Focus Management** | Visible focus indicators (`focus-visible`), logical tab order |
| **Keyboard Navigation** | Full keyboard access, `aria-expanded`, `aria-controls` |
| **Reduced Motion** | `prefers-reduced-motion` media query disables all animations |
| **High Contrast** | Interactive high-contrast mode toggle on accessibility page |
| **Font Scaling** | Interactive text size adjustment (12px–24px range) |
| **Color Contrast** | WCAG AA compliant ratios in both light and dark themes |
| **Multilingual** | 6 languages with proper `lang` attribute and fallback keys |
| **Screen Readers** | `sr-only` content, `aria-live` regions for dynamic updates |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework & SSR |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Lucide React | Icon library |
| Google Analytics | User tracking |
| Firebase/Firestore | Data services |
| Jest + Testing Library | Testing |
| LocalStorage | Client persistence |

---

## 📄 License

Educational project for civic engagement. Not affiliated with any political party or government body.
