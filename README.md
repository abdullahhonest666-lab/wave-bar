# Wave Bar — High-End Hair & Beauty Salon (MERN Architecture)

Wave Bar is a luxury digital platform for a high-end Beverly Hills hair and beauty salon. It features signature brush-wave styling, bespoke copper/rose-gold balayage, and private scalp spa rituals with an interactive multi-step appointment booking engine.

## Brand Identity & Aesthetic
- **Primary Logo**: Wordmark with charcoal "wave" and rose-gold metallic gradient "bar" accompanied by multi-strand wave lines (`/public/assets/aistudio/Wave_Bar_284bd31f.png`).
- **Favicon**: Circular rose-gold hairdryer icon with soft wave lines (`/public/assets/aistudio/WB-fav-icon_ca0a5dda.png`).
- **Palette**:
  - Primary: Rose Gold / Copper (`#B76E79` → `#C9A27C`)
  - Dark: Charcoal / Soft Black (`#2C2C2C`)
  - Light Surface: Warm Off-White / Cream (`#FDFBF7`)
  - Accent: Soft Champagne (`#E8D5B7`)
- **Typography**: Playfair Display (Luxury Serif Headings) + Montserrat & Plus Jakarta Sans (Clean Modern Body).

---

## Key Features

1. **Home Experience**:
   - Hero section with high-resolution salon backdrop, rose-gold overlay, and smooth wave animation.
   - Trust Bar highlighting **5.0 ★ rating (156+ verified reviews)**.
   - 4-Pillar Salon Philosophy (Signature Brush-Wave, Copper Alchemy, Wash Sanctuary, Molecular Bond Defense).
   - Curated ritual cards with direct booking action.
   - Instagram feed preview linking directly to [`https://www.instagram.com/wavebar__`](https://www.instagram.com/wavebar__).

2. **Haute Hair Services**:
   - Categorized filtering: *Cuts & Styling*, *Color & Balayage*, *Treatments & Hair Spa*, *Bridal & Glam*.
   - Duration, price, step breakdowns, and FAQ accordion.

3. **About & Master Stylists**:
   - Founder story: Elena Rostova.
   - Stylist dossiers for Master Colorists and Trichology Leads.
   - Sanctuary architecture details (Acoustic calming curves, steam mist wash loungers).

4. **Lookbook & Gallery**:
   - Masonry transformation gallery with category tabs.
   - Interactive Lightbox with high-resolution zoom, stylist credits, and "Request This Look" trigger.

5. **Multi-Step Booking Wizard**:
   - Step 1: Service Selection
   - Step 2: Master Stylist Selection (or First Available)
   - Step 3: Date & Time slot picker with real-time collision checking
   - Step 4: Client contact information & special hair notes
   - Step 5: Instant booking confirmation with confirmation code (`WB-XXXX`), celebratory confetti, simulated email confirmation receipt, and `.ics` calendar download.

6. **Simulated Email Confirmation Receipt**:
   - Branded digital inbox receipt view with full breakdown, valet arrival directions, and printable voucher.

7. **5.0 ★ Testimonials & Reviews**:
   - Category score breakdown (Artistry, Sanctuary, Wave Longevity).
   - "Share Your Experience" modal form to publish verified reviews directly to the database.

8. **Contact & Concierge**:
   - Address, telephone, concierge email, opening hours.
   - Interactive inquiry form.
   - Stylized Google Maps embed.

9. **Staff Admin Portal (Protected)**:
   - Secured with JWT token authentication.
   - Preset demo credentials: `admin@wavebar.com` / `wavebar2026`.
   - Real-time KPI dashboard: Total bookings, revenue, ratings, service count.
   - Appointment status management (Confirmed, Completed, Cancelled).
   - Menu service manager (Add, Edit, Delete).
   - Lookbook manager.

---

## Tech Stack & Setup

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Motion
- **Backend**: Node.js + Express (running on Port 3000)
- **Database**: MongoDB (via Mongoose) with automatic seeded in-memory fallback engine
- **Authentication**: JWT authentication with HMAC-SHA256 signature
- **Icons**: Lucide React
- **Celebration**: Canvas Confetti

### Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server** (Vite + Express unified backend):
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

### Deploying to Vercel

Vercel serves the Vite build as the frontend and routes `/api/*` requests through
the Express handler in `api/[...path].ts`. Deploy the project with the Vite
framework preset and set `JWT_SECRET` to a strong, private value in the Vercel
project's environment variables.

The current API stores data in memory, so changes made through the admin portal
are not durable across serverless instances or deployments. Use a persistent
database before relying on it for real bookings or admin edits.

### Admin Access
- Access via the **Admin** button in the top navigation or footer.
- **Email**: `admin@wavebar.com`
- **Password**: `wavebar2026`
