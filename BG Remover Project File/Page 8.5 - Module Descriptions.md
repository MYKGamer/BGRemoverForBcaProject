# MODULE DESCRIPTIONS

The application is divided into distinct, loosely coupled modules. Each module handles a specific set of responsibilities, which allows for independent development and easier debugging.

---

### Module 1: Authentication & Route Protection Module

**Responsibility:** Manages all aspects of user identity and access control.

**Key Components:**
*   **Registration:** New users sign up with email and password. Supabase Auth creates a record in `auth.users`.
*   **Auto-Initialization Trigger:** A PostgreSQL database trigger (`on_user_created`) automatically fires after registration. It creates a corresponding row in the `users_data` table and assigns **6 free credits** to the new account.
*   **Login & Session:** Users authenticate using `supabase.auth.signInWithPassword()`. A secure session JWT is stored in an HTTP-only cookie managed by Supabase.
*   **Route Protection (Middleware):** A Next.js `middleware.ts` file intercepts every incoming request to the `/dashboard` route. It verifies the session cookie. If no valid session exists, the user is immediately redirected to `/auth`.

---

### Module 2: Dashboard Shell & Navigation Module

**Responsibility:** Provides the persistent layout and navigation framework for all authenticated views.

**Key Components:**
*   **Sidebar Navigation:** A collapsible sidebar provides links to the Editor, History, Pricing, and Settings views.
*   **Responsive Design:** On mobile screens (width < 768px), the sidebar is replaced by a hamburger menu that opens a slide-in sheet panel.
*   **Real-Time Credit Display:** The user's current credit balance is fetched on dashboard load and displayed prominently. It updates automatically after each image is processed.
*   **State-Based View System:** Instead of separate page navigations, the dashboard uses a React `activeView` state variable to switch between sub-modules (Editor, History, Settings), giving the application a Single Page Application (SPA) feel without extra network requests.

---

### Module 3: AI Image Processing Module (`/api/remove-bg`)

**Responsibility:** The core functional module. Handles image upload, AI processing, storage, and database logging.

**Key Components:**
*   **File Ingestion:** Accepts a `multipart/form-data` POST request containing the user's image.
*   **Server-Side Authorization:** Verifies the user's Supabase session token from the request cookie. Rejects any unauthorized requests with a `401` status.
*   **Credit Guard:** Queries the `users_data` table. If the user's `credits` is `0` or less, rejects the request with an error message before any API call is made.
*   **Clipdrop API Integration:** Constructs a `FormData` object with the image and forwards it to `https://clipdrop-api.co/remove-background/v1` using the server-side `CLIPDROP_API_KEY` environment variable.
*   **Cloud Storage Upload:** The original image and the returned transparent PNG are both uploaded to the Supabase `creations` storage bucket under a `user_id/` path prefix.
*   **Atomic Credit Deduction:** Calls the `decrement_credit(user_id)` PostgreSQL RPC function to decrement credits safely.

---

### Module 4: History & Asset Management Module

**Responsibility:** Provides users with a persistent, manageable record of all their processed images.

**Key Components:**
*   **Fetching:** Queries the `history` table filtered by `user_id`. Row Level Security (RLS) on the Supabase table ensures a user can never access another user's records.
*   **Grid Display:** Past creations are displayed in a responsive image grid with original and transparent image previews.
*   **Rename:** Users can edit the title of any history record. The update is written back to the `history` table.
*   **Download:** A JavaScript download function creates a temporary anchor element and triggers a browser download of the transparent PNG.
*   **Delete:** Deleting a record triggers a two-step cleanup: the row is deleted from the `history` table AND the physical files (both original and transparent) are removed from Supabase Storage to prevent orphan files.

---

### Module 5: Monetization & Billing Module

**Responsibility:** Manages the credit purchase lifecycle using Razorpay.

**Key Components:**
*   **Pricing Display:** Available credit packages are displayed with their prices and credit amounts.
*   **Order Creation (`/api/create-order`):** When a user selects a plan, the server creates a Razorpay order server-to-server. This prevents any client-side price manipulation.
*   **Razorpay Checkout Modal:** The frontend initializes the Razorpay.js library with the `order_id` and opens the standard checkout modal.
*   **Signature Verification (`/api/verify-payment`):** After payment, the three Razorpay tokens (`order_id`, `payment_id`, `signature`) are sent to the server. The server computes an HMAC-SHA256 hash to verify the payment's authenticity before crediting the user. *(See Appendix A for full implementation.)*
