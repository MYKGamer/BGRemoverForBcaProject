# ABSTRACT

The objective of this project is to develop a cloud-based web application that automates the extraction of foreground subjects from digital images. Manual background removal using traditional graphic design software such as Adobe Photoshop is a time-intensive process that requires specialized design skills, making it impractical for high-volume use cases such as e-commerce product photography.

This project presents a **Software as a Service (SaaS)** solution to automate this workflow using Artificial Intelligence. The system is developed using **Next.js** for the frontend and server-side API routes, **Supabase** for PostgreSQL database management and user authentication, and the **Clipdrop API** as the core machine learning inference engine.

### Key Functionalities Implemented:
*   **Secure Authentication:** Email/password-based login and session management via Supabase Auth, with server-side route protection using Next.js Middleware.
*   **AI Processing Engine:** Images are uploaded, sent to the Clipdrop API from the server side, and the resulting transparent PNG is returned and stored in cloud storage.
*   **Credit-Based Usage Model:** Users receive 6 free credits on registration; each processing job deducts one credit. Credits can be replenished via payment.
*   **History Dashboard:** A persistent record of all processed images, with rename, download, and delete capabilities.
*   **Payment Gateway Integration:** Razorpay integration for secure credit top-ups, including server-side HMAC signature verification.

### Technology Stack:
*   **Frontend & Backend:** Next.js 14+ (App Router, API Routes), TypeScript.
*   **Styling:** Tailwind CSS, Shadcn UI.
*   **Database, Auth & Storage:** Supabase (PostgreSQL + Supabase Storage).
*   **AI Engine:** Clipdrop Remove Background API.
*   **Payment Gateway:** Razorpay.

The successful implementation of this application demonstrates the practical integration of modern web frameworks, third-party AI APIs, and cloud-native database architectures to solve a real-world digital workflow problem.

**Keywords:** *Background Removal, SaaS, Artificial Intelligence, Next.js, Supabase, Razorpay, Web Application, Cloud Computing, PostgreSQL.*

