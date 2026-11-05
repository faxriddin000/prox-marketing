# Prox Marketing Agency — Official Corporate Website & Custom React CMS

> **Planned Domain:** `proxmarketing.uz`  
> **Document Version:** 1.0 (Technical Specification — August 28, 2026)  
> **Framework:** React 19 + Tailwind CSS + Lucide React + Vite

---

## 🌟 Project Overview
**Prox Marketing Agency** is a premier digital marketing agency specializing in systematic business growth in the digital space and scaling revenue through strategic SMM, targeted advertising, branding, and state-of-the-art automation.

This project implements the complete Technical Specification (TZ) as a production-grade, responsive React web application with a live, reactive **Custom Admin Panel (CMS)** and **Role-Based Access Control (RBAC)**.

---

## 🚀 Key Features

### 1. Bilingual Architecture (i18n)
- **Uzbek (`UZ`)** and **Russian (`RU`)** languages with an instant toggle in Header and Footer.
- Full dictionary architecture with future-ready support for **English (`EN`)**.
- All sections, titles, forms, validation messages, and system alerts are 100% reactive.

### 2. Live React State & CMS Persistence
- Built on React **Context API** (`CMSContext`, `LanguageContext`, `AuthContext`).
- Persisted in `localStorage` — any change made in the Admin Panel updates the public website instantaneously.
- **"Reset to Default TZ Data"** button with confirmation dialog in the Admin Panel to restore original Technical Specification values at any moment.

### 3. Role-Based Access Control (RBAC)
- **Full Administrator (`admin`)**:
  - Full permissions: Hero banner, Services, Pricing & Tariffs, Partner logos, Portfolio, Team members, Contact & Map, Leads CRM (status change & deletion), and Telegram Bot API settings.
  - **Quick Demo Login:** `admin` / `prox2026`
- **Content Manager (`editor`)**:
  - Restricted permissions: Can edit text, descriptions, translations, banner, partner logos, portfolio items, and team members.
  - Cannot alter pricing, delete leads, or modify Telegram Bot settings.
  - **Quick Demo Login:** `editor` / `editor2026`

### 4. 7 Core Pages & Sections
1. **Bosh sahifa (Home Page)**:
   - Dynamic Hero Banner with customizable title, subtitle, badge, CTA, and banner mockup.
   - Services Preview (SMM, Marketing, IT) with deep links.
   - "Nega aynan biz?" (USP Block) featuring 6 core agency differentiators.
   - Hamkorlar logotiplari slayderi (responsive carousel).
   - Tariflar qisqacha (pricing preview).
   - Embedded CTA lead capture form.
2. **Biz haqimizda (About Us)**:
   - Official agency description (UZ & RU).
   - Mission and Core Values cards.
   - Team members module (hidden by default per TZ, toggleable from CMS).
3. **Xizmatlar (Services)**:
   - Filterable tabs: `Barchasi`, `SMM`, `Marketing`, `IT xizmatlari`.
   - **6 SMM Cards:** Strategiya, Kontent, Post/stori boshqaruvi, Reklama kampaniyalari, Brend imiji, Analitika va hisobot.
   - **7 Marketing Cards:** Barcha SMM takliflari, Target reklama (Google & Telegram Ads), Branding, Marketing strategiya & konsalting, Influencer marketing, Sotuv bo'limi nazorati, To'liq sotuv nazorati.
   - **6 IT Cards:** Veb-sayt ishlab chiqish, Mobil ilovalar, To'lov tizimlari integratsiyasi, UI/UX dizayn, Texnik qo'llab-quvvatlash, Sun'iy intellekt va botlar.
   - Each card features an **"Ariza qoldirish"** button that pre-selects that specific service in the consultation modal.
4. **Tariflar / Narxlar (Pricing & Tariffs)**:
   - **8.1 SMM Tariffs:**
     - 1 oylik: `$1500 / oy`
     - 3 oylik paket: `$1350 / oy` (save 10%)
     - 6 oylik paket: `$1200 / oy` (save 20%)
     - 12 oylik paket: `$1000 / oy` (save 33% — Best Value)
     - Interactive Comparison Table & Cards.
   - **8.2 Marketing Tariffs:**
     - Starting from `$2000` (individual calculation based on scope).
   - **8.3 IT Services:**
     - Individual quotation with built-in interactive **"Bepul smeta / taklif olish"** project estimator.
5. **Hamkorlarimiz (Partners)**:
   - Gallery grid and interactive carousel with real-time CMS management.
6. **Portfolio / Keyslar**:
   - Stylish **"Tez orada" ("Скоро")** placeholder state per TZ requirements.
   - Toggle in CMS to hide/show the Portfolio link in navigation.
   - CRUD management for case studies.
7. **Aloqa (Contact Page)**:
   - Clickable `tel:+998200260418` (`+998 20 026 04 18`).
   - Clickable Instagram `@prox_uz` and Telegram `@manager_prox`.
   - Lead capture form with strict phone format validation and anti-spam Captcha.
   - Conditional office address and Google Maps container that renders dynamically when configured in the Admin Panel.

### 5. Floating Live Chat & Telegram Widget
- Fixed bottom-right launcher button across all public pages.
- Direct link to Telegram `@manager_prox` or instant callback request dispatch.

### 6. Leads CRM & Telegram Bot Integration
- Automated storage of all inquiries in the React CMS state with status workflow (`Yangi`, `Jarayonda`, `Muvaffaqiyatli`, `Bekor qilingan`).
- Real HTTP dispatch to Telegram Bot API (`https://api.telegram.org/bot<TOKEN>/sendMessage`) when configured.
- Built-in "Send Test Message" tool in Admin to verify Telegram connectivity.

---

## 🛠 Tech Stack
- **Framework:** React 19 (Functional Components & Custom Hooks)
- **State Management:** React Context API (`CMSContext`, `LanguageContext`, `AuthContext`)
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Icons:** Lucide React + Bespoke SVGs
- **Build Tool:** Vite 8
- **Effects:** Canvas Confetti

---

## 💻 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔐 Admin Panel Credentials
- **URL / Access:** Click the **"Admin"** button in the header/footer or navigate to `#admin`.
- **Administrator Role:**
  - Login: `admin` | Password: `prox2026` (or click "Admin (To'liq)" demo button)
- **Editor Role:**
  - Login: `editor` | Password: `editor2026` (or click "Kontent-menejer" demo button)
