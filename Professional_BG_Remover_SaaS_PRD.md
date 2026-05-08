# Product Requirements Document (PRD): Professional AI Background Remover SaaS

## 1. Product Overview
**Product Vision:** A lightning-fast, highly accurate, and enterprise-grade background removal tool tailored for e-commerce, designers, and developers.
**Target Audience:** E-commerce owners, graphic designers, marketing agencies, and professional creators.
**Core Value Proposition:** Pixel-perfect background removal in under 3 seconds, accessible via a beautifully designed Web App with a seamless credit-based billing system and robust history management.

---

## 2. Technology Stack
- **Framework:** Next.js 14+ (App Router, Server Components).
- **Styling & UI:** Tailwind CSS, Shadcn UI, Framer Motion (for micro-interactions).
- **Backend/BaaS:** Supabase (PostgreSQL, Auth, Storage).
- **AI Processing:** Clipdrop API / Photoroom API (or equivalent enterprise AI endpoint).
- **Payments:** Razorpay (for INR/global transactions).
- **State Management:** React Hooks / Zustand (for client-side UI state).

---

## 3. Strict Development Guardrails (For AI Agents)
1. **Security First (CRITICAL):** Never expose AI API keys or Supabase Service Role keys to the client. All external API calls and sensitive DB mutations (like credit deduction) MUST happen in secure Next.js API Routes or Server Actions.
2. **Design Philosophy ("Anti-Vibecode"):**
   - **Premium Utilitarian Aesthetic:** Follow a Vercel/Linear design language. No cheap neon effects, no pure black (`#000000`).
   - **Colors:** Use deep slate/zinc backgrounds (`bg-zinc-950`), high contrast text, subtle borders (`border-zinc-800`), and semantic accent colors (e.g., solid Cobalt Blue for primary CTAs).
   - **Feedback:** No generic placeholders. You MUST implement robust loading states (Skeletons, progressive spinners) and Toast notifications (e.g., `sonner`) for all async actions.
3. **Performance & Limits:** Strict client-side and server-side file size validation (< 10MB). Supported formats: JPG, PNG, WEBP.

---

## 4. Database Architecture (Supabase PostgreSQL)
The database must be optimized for a multi-tenant SaaS application.

```sql
-- 1. Table: profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  credits INTEGER DEFAULT 5 NOT NULL, -- Free tier sign-up credits
  tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits)
  VALUES (new.id, new.email, 5);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Table: generations (History)
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Untitled Project',
  original_url TEXT NOT NULL,
  result_url TEXT NOT NULL,
  file_size_kb INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: payments (Transaction Logs)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  razorpay_order_id TEXT NOT NULL UNIQUE,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL,
  credits_added INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Security & Row Level Security (RLS)
- **Storage Bucket (`assets`):** Public read access allowed (for displaying images on the dashboard). Upload/Delete restricted to authenticated users matching `auth.uid()`.
- **Database Policies:**
  - `profiles`: Users can `SELECT` and `UPDATE` their own profile (name, avatar). Credit updates MUST bypass RLS using the Service Role Key.
  - `generations`: Users can perform full CRUD operations, but strictly restricted to `USING (auth.uid() = user_id)`.
  - `payments`: Users can `SELECT` their own transactions. `INSERT` and `UPDATE` (status verification) must be handled securely via backend API routes using the Service Role Key.

---

## 6. Core Features & User Flows

### A. Authentication & Onboarding
- **Flow:** Secure Email/Password authentication via Supabase Auth.
- **UX:** Seamless redirect to `/dashboard` post-login. Unauthenticated users are immediately intercepted by middleware and redirected to `/login`.
- **Incentive:** Users receive 5 free credits upon account creation.

### B. The AI Studio (Core Application)
- **UI:** A massive, sleek drag-and-drop zone with interactive hover states.
- **Processing Flow (Backend API Route `/api/process`):**
  1. Verify user session and check `profiles.credits > 0`. Throw error if 0.
  2. Upload original image buffer to Supabase Storage -> Retrieve Public URL.
  3. Send file to the AI Engine API (Clipdrop/Photoroom).
  4. Receive processed transparent image buffer -> Upload to Storage -> Retrieve Public URL.
  5. Log the generation details in the `generations` table.
  6. Deduct 1 credit from `profiles` using the Service Role key.
  7. Return both URLs to the client for rendering.
- **UX:** Display progressive loading stages (e.g., "Uploading...", "Isolating Subject...", "Finalizing...") to keep the user engaged during the 2-5 second wait.

### C. Dashboard & File Management
- **Architecture:** Multi-view layout (Dashboard, Editor, History, Billing) wrapped in a persistent Sidebar shell.
- **History View:** A responsive grid showing past `generations`. Must include a beautifully designed "Empty State" for new users.
- **Actions:**
  - **Inline Rename:** Edit the title of a generation.
  - **Download:** Trigger direct browser download of the High-Res PNG.
  - **Hard Delete:** A secure action that FIRST deletes the image files from the Supabase Storage bucket, THEN removes the database row to prevent orphan files and storage bloat.

### D. Monetization (Razorpay Integration)
- **Model:** Pay-as-you-go credit top-ups (e.g., 50 credits for ₹99, 200 credits for ₹299).
- **Flow:**
  1. User selects a package -> Client calls `/api/payments/create-order`.
  2. Server generates a Razorpay Order ID and returns it.
  3. Client opens the Razorpay Checkout modal.
  4. On success, client calls `/api/payments/verify` with payment signatures.
  5. Server strictly verifies the HMAC signature. If valid, it updates the `payments` table status to 'success' and adds credits to the user's `profiles` table.

---

## 7. Execution Phasing (Agent Roadmap)
To build this application systematically, the AI agent must follow these phases sequentially:

- **Phase 1 (Foundation):** Setup Next.js, configure Tailwind/Shadcn, and implement Supabase Authentication & Middleware.
- **Phase 2 (Database Architect):** Run SQL schemas for tables, RLS policies, triggers, and create the Storage buckets.
- **Phase 3 (The AI Engine):** Build the core `/api/process` route. Implement the frontend Drag-and-Drop Studio with progressive loading UX.
- **Phase 4 (Dashboard & History):** Construct the multi-view Dashboard shell. Build the History grid with Rename, Download, and secure Delete functionalities.
- **Phase 5 (Monetization Engine):** Integrate Razorpay. Build the pricing UI, the order creation route, and the highly secure payment verification webhook/route.

---
*End of Document. Await instructions before initiating Phase 1.*
