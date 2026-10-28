# Wave Bar Salon — Karachi

Wave Bar Salon is a hair and beauty salon in Zamzama Commercial Area, Karachi. This website presents salon services and prices from the supplied menus, salon and client photos, Google Maps review excerpts, location details, and appointment options.

## Brand Identity & Aesthetic
- **Primary Logo**: Supplied Wave Bar brand image (`/public/images/wavebar-logo.jpg`).
- **Palette**:
  - Primary: Rose Gold / Copper (`#B76E79` → `#C9A27C`)
  - Dark: Charcoal / Soft Black (`#2C2C2C`)
  - Light Surface: Warm Off-White / Cream (`#FDFBF7`)
  - Accent: Soft Champagne (`#E8D5B7`)
- **Typography**: Playfair Display (Luxury Serif Headings) + Montserrat & Plus Jakarta Sans (Clean Modern Body).

---

## Key Features

1. **Home Experience**:
   - Hero and gallery featuring the supplied salon and hair photos.
   - Google Maps rating and review count, with short, attributed review excerpts.
   - Service highlights and direct appointment actions.

2. **Haute Hair Services**:
   - Salon services and prices represented from the supplied hair, colour, and beauty menus.
   - Links to view the original menu images.

3. **About & Master Stylists**:
   - Salon information and names referenced in public reviews.

4. **Lookbook & Gallery**:
   - Supplied salon and client photos organized by category.
   - Supplied gallery photos are 4× AI-upscaled with [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN); the source photos are retained.
   - Interactive lightbox and appointment action.

5. **Multi-Step Booking Wizard**:
   - Step 1: Service Selection
   - Step 2: Team-member selection (or first available)
   - Step 3: Date and time selection with booking conflict checks
   - Step 4: Client contact information & special hair notes
   - Step 5: Booking confirmation with confirmation code, email-style receipt, and `.ics` calendar download.

6. **Simulated Email Confirmation Receipt**:
   - Booking details and location in an email-style receipt.

7. **Reviews**:
   - Attributed Google Maps excerpts and website-submitted reviews.
   - "Share Your Experience" form for website reviews.

8. **Contact**:
   - Salon address, telephone, Google Maps directions and map.
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
