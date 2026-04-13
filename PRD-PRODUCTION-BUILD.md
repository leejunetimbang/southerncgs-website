# PRD: Southern CGS Production Website Build

## Problem Statement

Southern Central Gas Suppliers (SCGS) needs a production-ready custom-coded website to replace their existing Framer site (subscription expiring mid-April 2026). The wireframe designs (low-fi and mid-fi) have been approved by the client (Alvin Gibson). The production folder has been set up with the core foundation (CSS, shared components, homepage), but 11 inner pages still need to be built, and integrations need to be connected.

The designer/developer (Lee June) is a designer by trade, not a developer — Claude assists with all code. The site must be plain HTML/CSS/JS (no frameworks) and deployable to Cloudflare Pages via GitHub.

## Solution

Build all remaining pages using the mid-fidelity wireframes as the design reference, with shared nav/footer components loaded via JavaScript. Product pages use client-side JS filtering. All third-party integrations (Formspree, Calendly, Google Maps, Elfsight) are embedded. The site is deployed to Cloudflare Pages with auto-deploy from GitHub.

## What's Already Built

The following files exist in this project and are COMPLETE:

| File | Status | Description |
|---|---|---|
| `index.html` | ✅ Done | Homepage — all 10 sections (hero, product carousel, why SCGS, supplier trust, industries, case studies, testimonials, services, LinkedIn, CTA) |
| `assets/css/styles.css` | ✅ Done | Full production CSS — all components, responsive breakpoints, design system |
| `assets/js/components.js` | ✅ Done | Shared nav/footer loader, active state management, hamburger menu |
| `components/nav.html` | ✅ Done | Shared navigation (red bar, mega menu, secondary product bar) |
| `components/footer.html` | ✅ Done | Shared footer (newsletter, social icons, link columns) |

## What Needs To Be Built

### Priority 1 — Inner Pages (11 pages)

All pages use the shared component pattern:
```html
<div id="nav-placeholder"></div>
[PAGE CONTENT]
<div id="footer-placeholder"></div>
<script src="[path]/assets/js/components.js"></script>
```

Reference the mid-fidelity wireframes at `../SouthernCGS/mid-wireframe/` for ALL content and structure.

| Page | File Path | Key Features |
|---|---|---|
| Products Landing | `pages/products/index.html` | Category cards grid (3-col), each linking to category page |
| Regulators | `pages/products/regulators.html` | Sidebar (240px) with 7 subcategory links + product grid (3-col) with JS filtering + 2 video placeholders + spec sheet banner |
| Valves | `pages/products/valves.html` | Same structure, 4 subcategories |
| Filters | `pages/products/filters.html` | Same structure, 2 subcategories |
| Laboratory Fittings | `pages/products/laboratory-fittings.html` | Same structure, 4 subcategories + full-width banner image section |
| Accessories | `pages/products/accessories.html` | Same structure, 6 subcategories |
| Industries | `pages/industries.html` | 8 industry cards (grid-4) + "Why Industries Trust SCGS" section (3 value cards) |
| Services | `pages/services.html` | 4 alternating left/right service blocks (Global Supply, Bespoke Design, Installer Supply, Fluid System Design) with checkmark bullets in rounded red circles |
| Resources | `pages/resources.html` | Product Documentation (3 cards) with category filter tabs (All, Regulators, Valves, Filters, Lab Fittings, Accessories) + Product Videos (2 cards) + LinkedIn Feed + Industry Insights placeholder |
| About | `pages/about.html` | Our Story (2-col) + Meet the Founder: Alvin Gibson (2-col) + Supplier Trust: Rotarex & Wescol + Our Values (3 cards) |
| Contact | `pages/contact.html` | Contact form (Full Name, Email, Phone, Company, Subject dropdown, Message) + Contact info card + Calendly embed + Google Maps embed |

### Priority 2 — Product Page JS Filtering

Each product category page (regulators, valves, filters, lab fittings, accessories) needs:

1. A **sidebar** with subcategory links (first item active by default)
2. A **product grid** that shows products for the selected subcategory
3. **JavaScript** that filters products when sidebar items are clicked (show/hide, no page reload)
4. Product data currently uses **placeholder content** (sample SKUs, descriptions)
5. In Phase 2, product data will come from **Google Sheets API**

The JS filtering script should:
- Read product data from a `data-subcategory` attribute on each product card
- On sidebar click, hide all cards, show only cards matching the clicked subcategory
- Update the "Showing N products" count
- Update sidebar active state
- Work without page reload

### Priority 3 — Third-Party Integrations

| Integration | Page(s) | Implementation |
|---|---|---|
| **Formspree** | Contact page | `<form action="https://formspree.io/f/[ID]" method="POST">` — Alvin creates account, provides form ID |
| **Calendly** | Contact page, CTA sections | `<div class="calendly-inline-widget" data-url="https://calendly.com/[ALVIN]"></div>` + Calendly script |
| **Google Maps** | Contact page | `<iframe src="https://www.google.com/maps/embed?pb=[LOCATION]">` — Alvin provides address |
| **Elfsight** | Homepage LinkedIn section, Resources page | `<div class="elfsight-app-[ID]"></div>` + Elfsight script — Alvin creates account |
| **Newsletter** | Footer (all pages) | Formspree form — submits email to Alvin's inbox |

Note: All integration IDs/URLs need to come from Alvin. Build with placeholders first.

### Priority 4 — Deployment

1. Initialize **Git repo** in this folder
2. Push to **GitHub** (create repo: `southerncgs-website` or similar)
3. Connect GitHub repo to **Cloudflare Pages**
4. Configure custom domain: `southerncgs.com`
5. Set up auto-deploy on push to `main` branch

## User Stories

1. As a **distributor visiting the homepage**, I want to immediately see high-quality imagery and a clear tagline, so that I know SCGS is a serious supplier.
2. As a **visitor**, I want the navigation to be sticky and always visible, so I can access any section without scrolling.
3. As a **visitor hovering over Products**, I want a mega menu showing all categories and subcategories, so I can jump directly to what I need.
4. As a **mobile visitor**, I want a hamburger menu and horizontal scrollable product bar, so the site works on my phone.
5. As a **visitor on a product category page**, I want a sidebar showing subcategories, so I can filter products without leaving the page.
6. As a **visitor clicking a subcategory in the sidebar**, I want the product grid to update instantly, so I don't wait for a page reload.
7. As a **visitor interested in a product**, I want "I'm Interested" and "Spec Sheet" buttons, so I can take action immediately.
8. As a **visitor on the Industries page**, I want to see which sectors SCGS serves, so I can confirm they work in my industry.
9. As a **visitor on the Services page**, I want to see detailed service descriptions with checkpoints, so I understand what SCGS offers beyond products.
10. As a **visitor on the Resources page**, I want to filter documentation by product category, so I find relevant PDFs quickly.
11. As a **visitor on the About page**, I want to see the founder's story and supplier partnerships, so I trust the business.
12. As a **visitor on the Contact page**, I want a form, phone number, email, map, and booking widget, so I can reach out my preferred way.
13. As a **visitor wanting to book a meeting**, I want a Calendly widget embedded on the site, so I can schedule without phone tag.
14. As a **visitor on any page**, I want to subscribe to a newsletter in the footer, so I stay updated.
15. As a **visitor**, I want to see live LinkedIn/Instagram posts on the homepage, so I know the business is active.
16. As a **visitor on the Laboratory Fittings page**, I want to see a banner image from the existing site, so the page feels rich.
17. As a **visitor on any product page**, I want to see 2 product videos side by side, so I can learn about products visually.
18. As **Alvin (site owner)**, I want the nav and footer shared across all pages, so updates only need to happen once.
19. As **Alvin**, I want the site hosted for free on Cloudflare Pages, so there are no monthly hosting costs.
20. As **Alvin**, I want to own the code on GitHub, so I'm never locked into a platform.
21. As **Alvin (Phase 2)**, I want to add products via a Google Spreadsheet, so I don't need to write code.
22. As **Alvin (Phase 2)**, I want a file upload option on the contact form, so customers can send specs.

## Implementation Decisions

### Architecture
- **Static site** — plain HTML/CSS/JS, no framework, no build step
- **Shared components** loaded via `fetch()` in `components.js` — nav.html and footer.html
- **Active states** managed via `data-page` and `data-category` attributes on nav links
- **CSS variables** for design system — all colors, spacing, typography defined in `:root`
- **Requires local server** for testing (Live Server extension) due to fetch() for components

### Navigation
- Primary nav: red (#FF3B49) background, white text, 72px height
- Secondary nav: light grey (#F5F5F5), 52px height, product categories
- Mega menu: triggered on hover, 3-column grid with all 23 subcategories
- Buttons: "Book a Meeting" (white border) + "Send an Enquiry" (black bg)
- Mobile: hamburger menu toggle via JS

### Product Pages
- One HTML page per category (5 total)
- Left sidebar (240px) with subcategory navigation
- Active subcategory has red left border accent
- Product grid (3-column) with cards: image, SKU, name, description, 2 stacked buttons
- JS filtering: click sidebar item → show/hide products by `data-subcategory`
- "Showing N products" counter updates on filter
- Sort dropdown (visual only for now)
- "Need Help?" CTA box in sidebar

### Page File Paths
- Homepage: `/index.html`
- Inner pages: `/pages/[page].html`
- Product pages: `/pages/products/[category].html`
- Components: `/components/nav.html`, `/components/footer.html`
- CSS: `/assets/css/styles.css`
- JS: `/assets/js/components.js`
- All internal links use absolute paths from root (e.g., `/pages/contact.html`)

### Design System
- Brand accent: #FF3B49 (coral red)
- Dark grey: #1a1a1a (headings, text, footer bg)
- Med grey: #555555 (body text)
- Border: #E0E0E0
- Background light: #F5F5F5
- Headings: Georgia serif (72px H1, 32px H2, 20px H3, 13px H4 uppercase)
- Body: Inter sans-serif, 15px
- No border-radius (0px) — industrial/sharp
- No shadows — flat borders only
- Buttons: uppercase, 1.5px letter-spacing, red primary hover to black
- Section padding: 120px vertical
- Container: 1440px max-width, 40px horizontal padding

### Responsive Breakpoints
- Desktop: default styles
- Mobile (max-width 768px): single column, hamburger nav, stacked grids
- Two-column gaps: 96px (981+), 64px (980-781), 48px (780-421), 32px (420-)

## Testing Decisions

Since this is a static HTML site with no build system:

- **Visual testing** — open each page in browser via Live Server, verify against mid-wireframe screenshots
- **Cross-browser** — test in Chrome, Firefox, Safari, Edge
- **Mobile responsive** — test at 375px, 768px, 1024px, 1440px widths
- **Navigation** — verify all links work, active states correct per page, mega menu functional
- **Product filtering** — verify sidebar click filters products correctly, counter updates
- **Component loading** — verify nav and footer load on every page
- **Forms** — verify Formspree submission works (once connected)
- **Embeds** — verify Calendly, Google Maps, Elfsight render correctly (once IDs provided)

## Out of Scope

- **Populating real product data** — Phase 2, using Google Sheets
- **File upload on contact form** — Phase 2, Formspree paid plan
- **Blog/case studies CMS** — Phase 2
- **Email marketing (Mailchimp)** — Phase 2
- **Individual product detail pages** — Phase 2
- **SEO optimization** — not current priority
- **E-commerce/pricing** — SCGS is B2B, no online purchasing
- **Content creation** — all images, copy, product data is Alvin's responsibility

## Further Notes

- **Mid-fidelity wireframes** are at `../SouthernCGS/mid-wireframe/` — use these as the source of truth for all content, layout, and structure
- **Alvin's brand color** is #FF3B49 (coral red) — from his current site at southerncgs.com
- **Service page bullets** use checkmarks inside 24px rounded red circles (inline styled in mid-wireframe)
- **Placeholders on grey sections** must use white background for contrast
- **Section labels** are centered by default; use `.section-label-left` class for left-aligned variants (services page numbers, homepage product categories header, about page founder section)
- The homepage **product categories** section uses a full-width 5-column grid with 4px gaps (not the standard container)
- The homepage **services** section uses `grid-2` (not grid-4)
- The homepage **hero** is centered layout with `display:grid; justify-items:center` on hero-content
