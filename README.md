# 🏙️ CityVaani

**CityVaani** is a modern, bilingual civic engagement web application built to bridge the gap between citizens and municipal authorities. It empowers users to easily report, view, and track local infrastructure and sanitation issues within their neighborhoods, while providing authorities with clear analytics and management tools to resolve them efficiently.


## ✨ Core Features

* **Bilingual Support (English & Hindi):** Fully localized interface tailored for inclusivity and wider reach.
* **Smart Citizen Reporting:** Intuitive multi-step form to report problems, categorize severity, and visually drop pins on a map.
* **OpenStreetMap (Leaflet) Integration:** Fully interactive mapping interface that geocodes neighborhoods into precise coordinates dynamically.
* **OTP & Magic Link Authentication:** Secure, passwordless login powered by Supabase Auth (with Google OAuth support).
* **"Zero-Friction" Guest Mode:** A specialized sandbox read-only mode allowing users to explore the dashboard anonymously without providing credentials.
* **Optimistic Local UI:** Instantly responsive UI with intelligent local caching before syncing to the cloud.

## 🛠️ Detailed Tech Stack

### Frontend Architecture
* **React 18 & TypeScript:** Built entirely on modern React functional components with strictly typed interfaces to prevent runtime errors.
* **Vite:** High-performance, lightning-fast frontend tooling and bundler.
* **React Router v6:** Seamless Client-Side Routing mapping out the Citizen vs Authority dashboards securely.
* **UI Component Library:** Leverages Shadcn UI design principles alongside custom CSS to build highly reusable, accessible, and beautiful modern components.

### Backend & Cloud Architecture (Supabase)
* **PostgreSQL Database:** Supabase Postgres used to safely store persistent `/cv_users` profiles and `/cv_issues` logs securely.
* **Row Level Security (RLS):** Strict database execution policies ensuring that anonymous queries, authenticated users, and authority members only write data they are authorized to touch.

### Secure Authentication System
* **Google OAuth Integration:** Deeply integrated Google Sign-In wrapper configured via Supabase Auth allowing seamless, 1-click credential onboarding.
* **Passwordless OTP (Magic Links):** Secure 8-digit Email-based One Time Password authentication.
* **Hybrid Storage Fallbacks:** If the cloud database drops, the application falls back to `localStorage` browser-storage with Mock Data seamlessly.

### Geographic Intelligence (Mapping)
* **Leaflet & React-Leaflet:** A completely free, fully open-source dynamic mapping engine used to inject the interactive Dashboard Maps.
* **OpenStreetMap (OSM) Tiles:** Tile server backing the map grid.
* **Nominatim Geocoding API:** Intercepts raw location strings (e.g. "Connaught Place") when a user reports a problem, instantly reverse-geocoding the text into Live Coordinates (Latitude & Longitude) dynamically!

## 🚀 Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/sanyamaggarwal4/CityVaani.git
cd CityVaani
npm install
```

### 2. Configure Environment Variables
Create a file named `.env.local` in the root directory and securely add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...<your-anon-key>
```
*(Note: If you launch the app without this file, it will intelligently fallback to **Local Mock Mode** containing dummy data for fast offline testing!)*

### 3. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

---

## 🔒 Database & RLS Security
If you are hooking this up to a live Supabase instance, ensure your **Row Level Security (RLS)** policies are configured correctly to accept both Authed and Anonymous (Guest) inserts.

Run the following inside your Supabase SQL Editor:
```sql
-- Allow anonymous guests to insert issues seamlessly
CREATE POLICY "Allow anonymous inserts" ON public.cv_issues FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous updates" ON public.cv_issues FOR UPDATE TO anon USING (true);
```

## 📜 License
This project was developed for demonstration and municipal prototype testing.
