# SYSTEM ARCHITECTURE & DATA FLOW

The application follows a **client-server architecture** built on the Next.js full-stack framework. The client (browser) never communicates directly with any third-party services. All sensitive operations — AI API calls, database writes, and payment verification — are performed exclusively on the server side via Next.js API Routes.

---

**Architecture Diagram:**

*(Student Note: Draw this diagram using MS Word Shapes or export it from [draw.io](https://draw.io) and insert it here as an image. The diagram should contain the following nodes and connections:)*

```
[User Browser]
     |
     | HTTPS Request
     ↓
[Next.js Frontend (Vercel)]
     |
     | Internal API Call
     ↓
[Next.js API Routes — Server Side]
     |           |            |
     ↓           ↓            ↓
[Supabase   [Clipdrop   [Razorpay
 DB/Auth/    API —        API —
 Storage]    AI Engine]   Payments]
```

---

### System Data Flow — Step by Step:

| Step | Phase | Description |
| :--- | :--- | :--- |
| **1** | Authentication | User logs in via Supabase Auth. A secure session token (JWT) is stored in an HTTP-only cookie. |
| **2** | Route Guard | Next.js Middleware checks for a valid session on every request to `/dashboard`. Unauthenticated users are redirected to `/auth`. |
| **3** | Image Upload | User selects an image in the browser. The file is sent as `FormData` to the `/api/remove-bg` API route on the server. |
| **4** | Credit Check | The API route queries the `users_data` table in Supabase. If `credits < 1`, the request is rejected with an error. |
| **5** | AI Processing | The server forwards the image to the **Clipdrop API** using a secret key stored only in server environment variables. The client never sees this key. |
| **6** | Storage | The resulting transparent PNG is uploaded to the **Supabase Storage** bucket and a public URL is generated. |
| **7** | Database Log | A new row is inserted into the `history` table, and the user's credit count is decremented by 1 using a secure PostgreSQL RPC function. |
| **8** | Response | The server returns the transparent image URL to the browser. The result is displayed to the user. |

