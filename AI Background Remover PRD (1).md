# **Master Execution PRD: AI Background Remover SaaS**

**Version:** 1.0 (Architect's Cut \- Secure, College Demo Optimized & "Anti-Vibecode")

**Project Type:** College Final Year Project

**Tech Stack:** Next.js 16+ (App Router), Tailwind CSS, Shadcn UI, Clipdrop API, Supabase (Auth, PostgreSQL, Storage).

## **🚨 AGENT DIRECTIVES & ANTI-VIBECODE GUARDRAILS**

1. **Strict Vertical Slicing:** DO NOT attempt to build the entire application at once. Follow the execution phases sequentially. Wait for the user's prompt before moving to the next phase.  
2. **API Security & Credits (Service Role):** The Clipdrop API key MUST NEVER be exposed to the client. All background removal requests must be routed through Next.js Server Actions. To deduct credits securely, the Server Action MUST use the SUPABASE\_SERVICE\_ROLE\_KEY to bypass client-side RLS restrictions.  
3. **Unified Backend (Supabase):** Use Supabase exclusively for Authentication, Database, and Image Storage.  
4. **"Anti-Vibecode" Design Aesthetic (CRITICAL):** \* **No Cheap AI Tropes:** Avoid pure black (\#000000) backgrounds, excessive neon glows, or generic centered layouts.  
   * **Premium Theme:** Use a structured Vercel/Linear aesthetic. Use deep zinc/slate (bg-zinc-950) for backgrounds, subtle borders (border-zinc-800), and crisp white text. Use solid **Cobalt Blue (bg-blue-600)** for primary CTAs.  
   * **Production Polish:** You MUST implement proper loading states (Shadcn Skeletons or spinners) for all async actions. You MUST use Toast notifications (e.g., sonner or Shadcn Toasts) for success/error feedback (e.g., "Image processed successfully", "Out of credits").  
5. **Mandatory Stitch Workflow:** You MUST use the installed Stitch skills (stitch-design, taste-design, shadcn-ui) for ALL frontend UI/UX generation. Ensure the design strictly follows the "Anti-Vibecode" rules, prioritizing premium layouts, loading skeletons, and interactive feedback.

## **🏗️ EXECUTION PLAN (HOW WE BUILD)**

* **Phase 1: Foundation, Git & Auth:** Setup Next.js, Tailwind, Shadcn. Initialize Supabase client. Build the Login/Signup page using Supabase Auth & Stitch Design skills. Commit and push the completed phase to GitHub via raw git commands.
* **Phase 2: Database & Storage Setup:** Setup the Supabase database schema, RLS policies, PostgreSQL triggers for the credit system (Default 6 credits), and create the creations storage bucket.  
* **Phase 3: The AI Engine (Server Action):** Write the secure Next.js Server Action that receives an image file, calls the Clipdrop API, saves both original and transparent results to Supabase Storage, and deducts 1 credit from the database using the Service Role Key.  
* **Phase 4: Dashboard & Upload UI:** Build the user dashboard. Include a highly polished drag-and-drop upload zone with loading states, and a real-time credit counter display.  
* **Phase 5: History & File Management:** Build the history grid displaying past creations. Implement beautiful empty states, 'Rename', 'Download', and a secure 'Delete' functionality.

## **📊 DATABASE SCHEMA (SUPABASE POSTGRESQL)**

**1\. Table: users\_data**

CREATE TABLE users\_data (  
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,  
  email TEXT NOT NULL,  
  credits INTEGER DEFAULT 6 NOT NULL, \-- SET TO 6 FOR COLLEGE DEMO  
  created\_at TIMESTAMPTZ DEFAULT NOW()  
);

\-- Trigger to give 6 free credits on signup  
CREATE OR REPLACE FUNCTION public.handle\_new\_user()  
RETURNS trigger AS $$  
BEGIN  
  INSERT INTO public.users\_data (id, email, credits)  
  VALUES (new.id, new.email, 6);  
  RETURN new;  
END;  
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on\_auth\_user\_created  
  AFTER INSERT ON auth.users  
  FOR EACH ROW EXECUTE PROCEDURE public.handle\_new\_user();

**2\. Table: history**

CREATE TABLE history (  
  id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
  user\_id UUID REFERENCES users\_data(id) ON DELETE CASCADE,  
  title TEXT DEFAULT 'Untitled Image',  
  original\_image\_url TEXT NOT NULL,  
  transparent\_image\_url TEXT NOT NULL,  
  created\_at TIMESTAMPTZ DEFAULT NOW()  
);

**3\. Storage Bucket:**

* **Name:** creations  
* **Visibility:** Public (so images can be displayed via URL).

**4\. Row Level Security (RLS) \- CRITICAL:**

ALTER TABLE users\_data ENABLE ROW LEVEL SECURITY;  
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

\-- Users can only read their own data (Server Action handles deduction)  
CREATE POLICY "Users can view own data" ON users\_data FOR SELECT USING (auth.uid() \= id);

\-- History Policies (CRUD)  
CREATE POLICY "Users can view own history" ON history FOR SELECT USING (auth.uid() \= user\_id);  
CREATE POLICY "Users can insert own history" ON history FOR INSERT WITH CHECK (auth.uid() \= user\_id);  
CREATE POLICY "Users can update own history" ON history FOR UPDATE USING (auth.uid() \= user\_id);  
CREATE POLICY "Users can delete own history" ON history FOR DELETE USING (auth.uid() \= user\_id);

## **⚙️ CORE FEATURE SPECIFICATIONS**

### **1\. Authentication (Supabase Auth)**

* Simple, secure Email/Password login.  
* **UX Requirement:** Clear error handling if login fails. Unauthenticated users trying to access /dashboard must be seamlessly redirected to /login.

### **2\. The Upload Zone & AI Processing**

* **UI:** A sleek, dashed-border drag-and-drop area. When processing, show a professional loading spinner and disable the upload input.  
* **Logic (Server Action workflow):**  
  1. Check if users\_data.credits \> 0\. If 0, throw a Toast error "Out of Credits".  
  2. Upload original image to Supabase Storage creations bucket \-\> Get Public URL.  
  3. Send image to Clipdrop API.  
  4. Receive transparent image \-\> Upload to Supabase Storage \-\> Get Public URL.  
  5. Save both URLs to the history table.  
  6. Deduct 1 credit from users\_data (Must use SUPABASE\_SERVICE\_ROLE\_KEY for this step).  
  7. Trigger success Toast notification.

### **3\. History Dashboard**

* **UI:** A responsive grid layout (1 col mobile, 3 cols desktop) showing the transparent images. MUST include a beautifully designed "Empty State" if the user has no history yet.  
* **Features:**  
  * **Rename:** User clicks an inline edit icon to edit the title of the image (Updates DB row). Show loading state during save.  
  * **Download:** A button that triggers a direct browser download of the transparent PNG from Supabase Storage.  
  * **Delete:** A button (with a confirmation prompt) that triggers a Server Action to FIRST delete the actual files from the Supabase Storage bucket, THEN remove the record from the history table to prevent storage leaks.  
  * **Admin Override:** The system owner can manually edit the credits value for any user directly from the Supabase Dashboard Table Editor.

**End of Master PRD. Agent, acknowledge this document and await the command to begin Phase 1\.**