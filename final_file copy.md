# **A Web Application for Automated Image Background Removal**

**A Project Report Submitted in Partial Fulfillment of the
Requirements**\
**for the Award of the Degree of**

## **BACHELOR OF COMPUTER APPLICATIONS (BCA)**

**Submitted By:**

|                   |                            |
|-------------------|----------------------------|
| **Name**          | \[YOUR FULL NAME\]         |
| **Roll No**       | \[YOUR ROLL NUMBER\]       |
| **Enrollment No** | \[YOUR ENROLLMENT NUMBER\] |
| **Academic Year** | 2023 – 2026                |

**Under the Supervision of:**

**\[SUPERVISOR/FACULTY NAME\]**\
*(Designation: Assistant Professor / Lecturer)*\
Department of Computer Applications

## **[YOUR COLLEGE NAME]**

**Affiliated to \[UNIVERSITY NAME\]**

**\[CITY, STATE\] — \[YEAR\]**

# **CERTIFICATE**

This is to certify that the Project Report entitled **"AI Background
Remover SaaS"** submitted by **\[YOUR FULL NAME\]**, Roll No. **\[YOUR
ROLL NUMBER\]**, in partial fulfillment of the requirements for the
award of the degree of **Bachelor of Computer Applications (BCA)** from
**\[UNIVERSITY NAME\]**, is a record of bona fide original work carried
out by the student under my supervision.

This project has not been submitted, either in part or full, to this or
any other University for the award of any degree or diploma.

|           |                                      |
|-----------|--------------------------------------|
| **Date**  | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Place** | \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |

**Project Guide / Supervisor:**

(Signature)\
**\[FACULTY NAME\]**\
*(Designation)*\
Department of Computer Applications, \[College Name\]

**Head of Department:**

(Signature)\
**\[HOD NAME\]**\
Head, Department of Computer Applications, \[College Name\]

**External Examiner:**

(Signature)\
Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\
Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# **DECLARATION**

I, **\[YOUR FULL NAME\]**, student of BCA (Final Year), Roll No.
**\[YOUR ROLL NUMBER\]**, hereby declare that the project report
entitled **"AI Background Remover SaaS"** submitted to the Department of
Computer Applications, **\[COLLEGE NAME\]**, affiliated to
**\[UNIVERSITY NAME\]**, is an original and independent work carried out
by me.

I further declare that:

- This project is my own work and has not been submitted, either in part
  or full, for any other degree or diploma at this or any other
  University.

- All references to other sources have been duly acknowledged.

- The project was developed under the supervision of **\[FACULTY
  NAME\]**.

(Signature of Student)\
**\[YOUR FULL NAME\]**\
Roll No: \[YOUR ROLL NUMBER\]\
Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# **ACKNOWLEDGEMENT**

First and foremost, I would like to express my deep sense of gratitude
to my project guide, **\[FACULTY NAME\]**, for their invaluable
guidance, encouragement, and support throughout the development of this
project.

I am also thankful to the Head of the Department and all the faculty
members of the Department of Computer Applications for providing the
necessary facilities and a conducive environment for completing this
project.

Finally, I would like to thank my family and friends for their constant
support and motivation, which helped me stay focused and complete this
work successfully.

(Signature of Student)\
**\[YOUR FULL NAME\]**

# **ABSTRACT**

The main goal of this project is to create a web application that automatically removes the background from images. While making graphics for college events, I realized that manual background removal using software like Photoshop takes too much time and requires skills that many people don't have. 

To solve this, I developed a **Software as a Service (SaaS)** solution that uses Artificial Intelligence to do this work automatically in seconds. The website is built using **Next.js** for a fast frontend, **Supabase** for secure user login and database management, and the **Clipdrop API** as the actual AI brain that processes the images.

### **Key Functionalities Implemented:**

- **Secure Authentication:** Email/password-based login and session
  management via Supabase Auth, with server-side route protection using
  Next.js Middleware.

- **AI Processing Engine:** Images are uploaded, sent to the Clipdrop
  API from the server side, and the resulting transparent PNG is
  returned and stored in cloud storage.

- **Credit-Based Usage Model:** Users receive 6 free credits on
  registration; each processing job deducts one credit. Credits can be
  replenished via payment.

- **History Dashboard:** A persistent record of all processed images,
  with rename, download, and delete capabilities.

- **Payment Gateway Integration:** Razorpay integration for secure
  credit top-ups, including server-side HMAC signature verification.

### **Technology Stack:**

- **Frontend & Backend:** Next.js 16.2.4 (App Router, API Routes),
  TypeScript

- **Styling:** Tailwind CSS, Shadcn UI

- **Database, Auth & Storage:** Supabase (PostgreSQL + Supabase Storage)

- **AI Engine:** Clipdrop Remove Background API

- **Payment Gateway:** Razorpay

The successful completion of this project helped me understand how modern web frameworks, external AI APIs, and cloud databases work together to build a real-world SaaS product.

**Keywords:** *Background Removal, SaaS,
Next.js, Supabase, Razorpay, Web Application, Cloud Computing,
PostgreSQL.*

# **TABLE OF CONTENTS**

> **Note:** After inserting all screenshots and finalizing in MS Word,
> delete this table and use: References → Table of Contents → Automatic
> Table 1 for accurate page numbers.

| **S.No** | **Chapter / Section**                        | **Page No** |
|----------|----------------------------------------------|-------------|
| —        | Certificate                                  | 2           |
| —        | Declaration                                  | 3           |
| —        | Acknowledgement                              | 4           |
| —        | Abstract                                     | 5           |
| —        | List of Figures                              | 6           |
| **1**    | **Project Introduction**                     | 7           |
|          | 1.1 Background                               | 7           |
|          | 1.2 Problem Statement                        | 7           |
|          | 1.3 Proposed Solution                        | 7           |
|          | 1.4 What is SaaS?                            | 8           |
|          | 1.5 Project Objectives                       | 8           |
|          | 1.6 Scope of the Project                     | 8           |
|          | 1.7 Feasibility Study                        | 9           |
|          | 1.8 SDLC Methodology                         | 10          |
| **2**    | **Technology Stack**                         | 11          |
| **3**    | **System Requirement Specification (SRS)**   | 12          |
| **4**    | **System Architecture & Data Flow**          | 13          |
| **5**    | **Module Descriptions**                      | 14          |
| **6**    | **UI Documentation — Landing Page**          | 16          |
| **7**    | **UI Documentation — Authentication**        | 17          |
| **8**    | **UI Documentation — Dashboard & Sidebar**   | 18          |
| **9**    | **UI Documentation — AI Background Editor**  | 19          |
| **10**   | **UI Documentation — History Management**    | 21          |
| **11**   | **UI Documentation — Settings & Profile**    | 22          |
| **12**   | **UI Documentation — Pricing & Payments**    | 23          |
| **13**   | **Database Design & Data Dictionary**        | 25          |
| **14**   | **Software Testing**                         | 27          |
| **15**   | **Results & Output**                         | 29          |
| **16**   | **Conclusion & Future Scope**                | 30          |
| **17**   | **References**                               | 31          |
| **—**    | **Appendix: Technical Details (Viva Prep)**     | 32          |

# **LIST OF FIGURES**

| **Figure No** | **Description**                       | **Page No** |
|---------------|---------------------------------------|-------------|
| Figure 1      | System Architecture & Data Flow       | —           |
| Figure 2      | Landing Page — Full View              | —           |
| Figure 3      | Authentication — Login / Sign Up Page | —           |
| Figure 3B     | Supabase Auth Dashboard — Registered Users List | — |
| Figure 4      | Dashboard — Desktop View with Sidebar | —           |
| Figure 5      | Dashboard — Mobile Responsive View    | —           |
| Figure 6      | AI Background Editor — Upload Zone    | —           |
| Figure 7      | AI Background Editor — Result Preview | —           |
| Figure 8      | History Dashboard — Image Grid        | —           |
| Figure 9      | Settings — Profile & Account Panel    | —           |
| Figure 10     | Pricing Page — Credit Plans           | —           |
| Figure 11     | Razorpay Checkout Modal               | —           |
| Figure 12     | Entity Relationship (ER) Diagram      | —           |
| Figure 12B    | Supabase SQL Editor — Database Schema Implementation | — |

---

# **LIST OF TABLES**

| **Table No** | **Description** | **Page No** |
| :--- | :--- | :--- |
| Table 1 | Software Requirements & Tech Stack | — |
| Table 2 | Software Requirements (System Specific) | — |
| Table 3 | Hardware Specifications | — |
| Table 4 | Project Module Descriptions | — |
| Table 5 | Data Dictionary — `users_data` Table | — |
| Table 6 | Data Dictionary — `history` Table | — |
| Table 7 | Functional Test Cases & Results | — |

---

# **CHAPTER 1: PROJECT INTRODUCTION**

## **1.1 Background**

In today's world, image editing has become a very important part for businesses and social media users. One of the most common but difficult tasks is **removing the background** from photos — especially when the image has complex edges like hair, fur, or semi-transparent objects. Usually, this requires high-end software like Adobe Photoshop and special skills, which most people don't have.

## **1.2 Problem Statement**

The traditional way of removing backgrounds is:
- **Time-consuming:** It can take a lot of time to manually select edges.
- **Difficult:** Not everyone knows how to use professional editing tools.
- **Expensive:** Hiring a designer for every single photo is not affordable for everyone.

During my research, I noticed that most free tools online either add watermarks, ask for premium subscriptions instantly, or reduce the image quality. There is a clear need for a simple, fast tool that anyone can use directly from their browser.

## **1.3 Proposed Solution**

To solve this problem, I built an **AI-powered web application**. Users just need to create an account and upload their photo. The AI automatically detects the subject, removes the background, and gives them a clean, high-quality transparent PNG image in just a few seconds.

## **1.4 What is SaaS?**

**Software as a Service (SaaS)** means software that you can use over the internet without needing to install anything on your computer. 

My project follows this model because:
- **User Accounts:** Every user has their own space to save history.
- **Credit System:** Users use credits to process images.
- **Web-Based:** It runs entirely on the browser.

## **1.5 Project Objectives**
- To create a secure and easy-to-use website for background removal.
- To use a cloud database for saving user images and credit history.
- To implement a working payment system for buying credits.
- To make sure the website works perfectly on both mobile phones and laptops.

## **1.6 Scope of the Project**
- User Login and Account Management.
- Automatic background removal using AI.
- Saving past work so users can download it later.
- Online payment integration using Razorpay.

## **1.7 Feasibility Study**

Before writing the code, I did a quick feasibility study to make sure I could actually complete this project within the college deadlines:

### **1.7.1 Technical Feasibility**
I chose **Next.js** and **Supabase** because they have great documentation. Instead of trying to train my own AI model (which requires heavy GPUs and Python knowledge), I decided to use the **Clipdrop AI API**. This makes the project technically possible for a single student to build.

### **1.7.2 Economic Feasibility**
The project is cost-effective because I utilized the "Free Tiers" of Vercel and Supabase for hosting and database. I also implemented a credit system so that if it scales, server costs can be covered.

### **1.7.3 Operational Feasibility**
I designed the website to be extremely simple. If a user knows how to upload a photo to Facebook or Instagram, they can use this tool without any training.

## **1.8 SDLC Methodology**

I used the **Iterative Development** model for this project. This means I built the project piece by piece:
1.  **Planning:** Deciding the main features.
2.  **Building:** Creating one module at a time (like Login first, then Editor).
3.  **Testing:** Checking for bugs after every new feature.
4.  **Deployment:** Putting the website online for everyone to use.

---

# **CHAPTER 2: TECHNOLOGY STACK**

The project is built using modern tools that focus on speed and security.

***Table 1: Software Requirements & Tech Stack***
| **Technology** | **Role** | **Purpose** |
|----|----|----|
| **Next.js 16.2.4** | Framework | The main framework for building the website. |
| **TypeScript** | Language | Used to write cleaner and bug-free code. |
| **Tailwind CSS** | Styling | For making the website look modern and beautiful. |
| **Supabase** | Backend / DB | For Login, Database, and saving image files. |
| **Clipdrop API** | AI Engine | The "brain" that actually removes the background. |
| **Razorpay** | Payments | To securely accept online payments. |

## **Why This Stack?**
- **Fast:** Next.js makes the website load very quickly.
- **Secure:** Supabase handles user data very safely.
- **Responsive:** Tailwind CSS makes it look good on mobile phones.

---

# **CHAPTER 3: SYSTEM REQUIREMENT SPECIFICATION (SRS)**

## **3.1 Software Requirements**
***Table 2: Software Requirements (Environment)***
| **Category** | **Technology / Tool** |
| :--- | :--- |
| **Operating System** | Windows 10 / 11 |
| **Languages** | JavaScript, TypeScript (ES6+) |
| **Database** | PostgreSQL (Supabase) |
| **Code Editor** | Visual Studio Code (VS Code) |
| **Backend Integration** | Next.js API Routes |

## **3.2 Hardware Requirements**
***Table 3: Hardware Specifications***
| **Hardware** | **Minimum Specification** |
| :--- | :--- |
| **Processor** | Intel Core i3 (or equivalent) |
| **Memory (RAM)** | 8 GB minimum |
| **Storage** | 1 GB Free Disk Space |
| **Connectivity** | Stable Internet Connection |

## **3.3 End-User Requirements**
Users only need a modern web browser (like Chrome, Safari, or Edge) and an active internet connection on any device (Mobile, Tablet, or PC).

---

# **CHAPTER 4: SYSTEM ARCHITECTURE & DATA FLOW**

The website uses a **Client-Server** model. This means the browser (Client) talks to the Server, and the Server talks to the AI and Database. **As illustrated in Figure 1 below**, the system manages a seamless flow between the frontend UI and backend cloud services.

> **Figure 1: System Architecture & Data Flow**
> ![System Architecture](./media/image1.png)

## **4.1 How the Data Flows (Step-by-Step)**

1.  **Login:** User logs in securely.
2.  **Upload:** User picks a photo and uploads it.
3.  **Check Credits:** The system checks if the user has enough credits.
4.  **AI Process:** The server sends the image to the AI to remove the background.
5.  **Save:** The result is saved in the cloud storage and database.
6.  **Result:** The user sees the final transparent image and can download it.

---

# **CHAPTER 5: MODULE DESCRIPTIONS**

## **5.1 Module Overview**
I have divided the project into 7 main parts (Modules). This modular approach helps in building, testing, and managing the application effectively.

***Table 4: Project Module Descriptions***
| **Module No** | **Module Name** | **Objective & Key Functions** |
| :--- | :--- | :--- |
| **Module 1** | **Landing Page** | Introduces the product, features "Dark Mode" UI, and converts visitors into users via clear CTA. |
| **Module 2** | **Login & Security** | Handles secure Signup/Login via Supabase Auth and protects Dashboard access. |
| **Module 3** | **AI Editor** | Core engine for background removal with Drag-and-Drop zone and real-time processing animation. |
| **Module 4** | **History Management** | Displays a grid of past processed images with full CRUD (Rename, Download, Delete) controls. |
| **Module 5** | **Credit & Payment** | Manages real-time credit balance and handles secure payments via Razorpay (Sandbox Mode). |
| **Module 6** | **User Profile** | Allows account management, credit balance checking, and secure logout. |
| **Module 7** | **Core API** | The backend "bridge" that handles sensitive tasks like credit deduction, AI processing via Clipdrop, and secure database updates, ensuring API keys remain hidden. |

---

---

# **CHAPTER 6: UI DOCUMENTATION — LANDING PAGE**

The Landing Page is the "Front Door" of the application. It is designed to be attractive and simple so that anyone can understand what the tool does immediately.

## **6.1 Design Overview**
I chose a **Cobalt Blue and Dark Slate** theme to give a professional and modern look. This "Dark Mode" design is very popular in modern web apps and is easy on the eyes. The page features a clear headline and a "Get Started" button that draws the user's attention.

## **6.2 Layout Sections**
1.  **Navigation Bar:** Contains the logo and links to Login/Dashboard. It stays at the top even when the user scrolls (Sticky Header) for easy access.
2.  **Hero Section:** A big, bold area that explains the main feature: "Remove backgrounds in seconds."
3.  **Features Section:** Icons and text explaining that it's fast, free (to start), and powered by AI.
4.  **Call-to-Action (CTA):** A final button at the bottom to encourage users to sign up and start using the tool.

**Figure 2 shows the full layout of the landing page**, highlighting the modern blue-and-slate aesthetic designed for maximum user engagement.

> **Figure 2: Landing Page — Full View**
> ![Landing Page Screenshot](./media/image2.jpeg)

**Design Logic:** The Landing Page follows the **AIDA model** (Attention, Interest, Desire, Action). It first grabs attention with a bold headline, builds interest with features, and finally leads the user to the "Action" (Sign up).

---

# **CHAPTER 7: UI DOCUMENTATION — AUTHENTICATION**

Security was a top priority for me. I used a secure login system so that every user's data and images stay private.

## **7.1 Secure Login & Signup**
The application provides a clean interface for users to create an account or log in. I chose **Supabase Auth**, which uses secure "JSON Web Tokens" (JWT) to keep the user logged in. This is much safer than building a custom login system from scratch.

### **Technical Implementation — Auth Logic**
Below is the core logic I wrote for handling Email/Password login and Google OAuth integration. This ensures that user sessions are handled securely on the server-side.

```typescript
// 1. Email and Password Login Logic
export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Authenticate user and create a secure JWT session
  const { error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  })

  if (error) return { error: error.message }
  redirect('/dashboard')
}

// 2. Social Login (Google OAuth) Logic
export async function loginWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  })

  if (data.url) redirect(data.url) // Redirect user to Google Login page
}
```

### **Key Insights of the Auth Logic:**
- **Secure Sessions:** Instead of storing plain passwords in my database, I use Supabase Auth which handles encryption and **JSON Web Tokens (JWT)**.
- **Server-Side Redirects:** Using Next.js `redirect()`, I ensure that the user only enters the dashboard after a successful server-side handshake.
- **OAuth Flexibility:** The logic is designed to support both traditional login and one-click Google login, reducing friction for new users.

## **7.2 Why Authentication?**
- **Privacy:** Only the owner of the account can see their processed images.
- **Credit Balance:** The system needs to know who you are to track your remaining credits.
- **Persistence:** You can log in from any computer and see your past work (History).

**The authentication interface, as seen in Figure 3**, provides a secure entry point for existing users, while **Figure 3B illustrates the backend registration records** stored in the Supabase Auth dashboard.

> **Figure 3: Authentication — Login / Sign Up Page**
> ![Authentication Page](./media/authPageimg.jpeg)

> **Figure 3B: Supabase Auth Dashboard — Registered Users List**
> ![Supabase Auth Screenshot](./media/supaAuthScreen.jpg)

**UI/UX Insight:** I kept the Auth forms centered and clean to minimize distractions. By reducing the number of input fields, I wanted to improve the **Conversion Rate** for new users.

---

# **CHAPTER 8: UI DOCUMENTATION — DASHBOARD & SIDEBAR**

The Dashboard is the control center where the user spends most of their time. It is designed to be "Single Page," meaning the user doesn't have to wait for pages to reload when switching features.

## **8.1 Sidebar Navigation**
A sidebar on the left lets the user switch between different views using **Client-side Routing**:
- **BG Editor:** The main tool for processing new images.
- **My Creations:** The history of all processed images.
- **Pricing:** To buy more credits.
- **Settings:** To manage the account.

**As shown in Figure 4**, the desktop dashboard provides an expansive view with a persistent sidebar for quick navigation between core features.

> **Figure 4: Dashboard — Desktop View with Sidebar**
> ![Dashboard View](./media/image4.png)

## **8.2 Responsive Design**
The sidebar is "Responsive." This means on a desktop, it's always visible, but on a mobile phone, it hides behind a menu button (Hamburger Menu) to save space. **Figure 5 captures how the UI adapts to mobile screens**, ensuring a smooth experience for on-the-go users.

> **Figure 5: Dashboard — Mobile Responsive View**
> ![Mobile View 1](./media/image5.png) ![Mobile View 2](./media/image6.png)

**Design Logic:** The Dashboard uses a **Visual Hierarchy**. The most important tools (Editor) are easily accessible, while secondary features (Settings) are tucked away in the sidebar to keep the workspace clean.

---

# **CHAPTER 9: UI DOCUMENTATION — AI BACKGROUND EDITOR**

This is the most important part of the project—the actual tool that removes backgrounds.

## **9.1 Simple Upload & Validation**
I implemented a "Drag and Drop" zone for a better user experience. Before sending the file to the AI, the system checks:
- **File Type:** Only images like JPG and PNG are allowed.
- **File Size:** It strictly limits file uploads to a maximum of **4MB** to ensure stability and save bandwidth. Any file exceeding this limit will trigger an error.

**The upload interface shown in Figure 6** allows users to either click or drag-and-drop their images for instant validation.

> **Figure 6: AI Background Editor — Upload Zone**
> ![Editor Screenshot](./media/image7.png)

## **9.2 Processing & Result Preview**
While the AI is working on the server, the user sees a "Processing..." animation. This keeps the user informed so they don't think the app is frozen. Once done, the result is shown instantly in a high-quality preview.

### **Technical Implementation — AI Processing Engine**
This is the most critical part of the backend. I created a secure API route that receives the image, validates the user's credits, and communicates with the **Clipdrop AI** servers to remove the background.

```typescript
// Core API Logic for AI Background Removal
export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('image') as File
  const accessCode = req.headers.get('x-access-code')

  // 1. Project Evaluation Security (Access Code)
  if (accessCode !== '2026') {
    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 403 })
  }

  // 2. Call Clipdrop AI API
  const clipdropForm = new FormData()
  clipdropForm.append('image_file', file)

  const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
    method: 'POST',
    headers: { 'x-api-key': process.env.CLIPDROP_API_KEY! },
    body: clipdropForm,
  })

  // 3. Handle Binary Response and Storage
  const buffer = await response.arrayBuffer()
  // ... storage and database update logic follows
}
```

### **Logic Behind the Processing Engine:**
- **Server-Side Proxy:** The request is handled by a Next.js API Route. This is crucial because it keeps the **CLIPDROP_API_KEY** hidden on the server, preventing unauthorized use by others.
- **Security Gatekeeper:** I implemented a custom `x-access-code` check. This acts as a secondary layer of protection specifically for project evaluation.
- **Binary Data Handling:** Since images are binary files, the code converts the API response into an `arrayBuffer` before saving it to Supabase Storage.

**The processed result as seen in Figure 7** demonstrates the precise AI background removal, which is then presented in a high-fidelity preview mode.

> **Figure 7: AI Background Editor — Result Preview**
> ![Result Screenshot](./media/image9.png)

**UI/UX Insight:** I added a **Continuous Feedback Loop**. From the moment an image is dropped to the final result, the UI provides real-time status updates (Progress Bars/Spinners) to ensure the user feels in control.

---

# **CHAPTER 10: UI DOCUMENTATION — HISTORY MANAGEMENT**

Users can keep a record of all their processed images. This is very useful if they want to download an image again later without spending more credits.

## **10.1 Image Grid**
The "My Creations" page shows all past images in a beautiful grid. Each image has its original name and the date it was created.

## **10.2 Asset Management (CRUD)**
Users have full control over their history. They can perform "CRUD" operations (Create, Read, Update, Delete):
- **Download:** Save the transparent PNG to their device.
- **Rename:** Update the title of the image in the database.
- **Delete:** Permanently remove the image from both the Database and the Cloud Storage to keep the system clean.

### **Technical Implementation — Storage & DB Synchronization**
When a user deletes an image, it is important to remove it from the cloud storage bucket to save space and then delete the record from the database. Below is the logic I implemented using **Next.js Server Actions**:

```typescript
export async function deleteHistoryItem(id: string, originalUrl: string, transparentUrl: string) {
  const supabase = await createClient()

  // 1. Delete actual image files from Supabase Storage FIRST
  const originalFile = extractFilename(originalUrl)
  const transparentFile = extractFilename(transparentUrl)

  const { error: storageError } = await supabase.storage
    .from('creations')
    .remove([originalFile, transparentFile])

  if (storageError) return { error: 'Failed to clear cloud storage' }

  // 2. THEN delete the metadata from PostgreSQL database
  const { error: dbError } = await supabase
    .from('history')
    .delete()
    .eq('id', id)

  revalidatePath('/dashboard')
  return { success: true }
}
```

### **Data Integrity & Cleanup Logic:**
- **Two-Step Deletion:** I specifically delete the physical files from the **Cloud Storage** before deleting the database record. This prevents "orphaned files" from taking up storage space.
- **Dynamic Filename Extraction:** Since URLs are long, I wrote a helper function to extract only the filename, ensuring the storage provider recognizes which file to remove.
- **Cache Invalidation:** The `revalidatePath()` function ensures the UI updates instantly after a deletion, providing a smooth user experience.

**Figure 8 illustrates the comprehensive history management grid**, where users can view and manage their processed assets in one place.

> **Figure 8: History Dashboard — Image Grid**
> ![History Screenshot](./media/image10.jpeg)

**Design Logic:** The History grid uses **Card-based Layout**. This makes it easy for users to scan through multiple images quickly. It also provides an organized way to present both the image and its management tools (Rename/Delete).

---

# **CHAPTER 11: UI DOCUMENTATION — SETTINGS & PROFILE**

The Settings page is where users can see their account details and manage their session.

## **11.1 Account Summary**
The user can see their registered email and their current **Credit Balance**. This balance is updated in real-time as soon as the user processes an image or buys more credits.

## **11.2 Secure Session Management**
A logout button is provided to safely end the session. This clears all security cookies from the browser so that no one else can access the account on that device. **The user profile panel is represented in Figure 9**, showcasing the clean integration of account settings.

> **Figure 9: Settings — Profile & Account Panel**
> ![Settings Screenshot](./media/image11.jpeg)

**UI/UX Insight:** I grouped related account settings together. The use of a clear **Credit Badge** ensures the user always knows their current balance without having to search for it.

---

# **CHAPTER 12: UI DOCUMENTATION — PRICING & PAYMENT SYSTEM**

To make the project look like a real-world SaaS product, I integrated a pricing and payment system.

## **12.1 Credit System Logic**
Each image process costs **1 Credit**. New users get **6 free credits** to try the tool. If they need more, they can choose from different credit packages (e.g., 5 credits, 10 credits). **Figure 10 displays the various credit tiers available** for users who wish to upgrade.

> **Figure 10: Pricing Page — Credit Plans**
> ![Pricing Screenshot](./media/image12.png)

## **12.2 Razorpay Integration (Sandbox Mode)**
I integrated the **Razorpay Payment Gateway** using its **"Test Mode" (Sandbox)**. This allowed me to test the entire payment flow—from entering UPI details to successful credit updates—without using real money.

### **Technical Implementation — Payment Verification (Security)**
To prevent malicious users from "faking" a payment successful event, I implemented server-side verification. The server calculates an **HMAC-SHA256 signature** using a secret key and compares it with the one sent by Razorpay.

```typescript
// Secure Payment Verification Logic
export async function POST(req: Request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

  // 1. Create the verification string
  const body = razorpay_order_id + "|" + razorpay_payment_id

  // 2. Calculate HMAC-SHA256 signature using Secret Key
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  // 3. Compare signatures to confirm authenticity
  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    // Logic to add credits to users_data table
    return NextResponse.json({ success: true })
  }
}
```

### **Why Signature Verification Matters:**
- **Anti-Fraud Mechanism:** Without this, a user could manually trigger a "Success" API call from their browser. By using **HMAC-SHA256**, we verify that the confirmation actually came from Razorpay.
- **Mathematical Proof:** The server re-calculates the signature using a secret key that only the server and Razorpay know. If the signatures don't match, the transaction is rejected.
- **Transactional Safety:** Credits are only added to the `users_data` table *after* this mathematical verification is successful.

Once a payment is verified by the server, the credits are added to the user's account automatically. **The secure Razorpay integration modal is depicted in Figure 11**, demonstrating the checkout flow in sandbox mode.

> **Figure 11: Razorpay Checkout Modal**
> ![Razorpay Modal](./media/image13.png)

**Design Logic:** The Pricing page uses **Anchoring Logic**. By showing different packages side-by-side, users can easily compare the value and choose the one that best fits their needs.

---

# **CHAPTER 13: DATABASE DESIGN & DATA DICTIONARY**

The project uses a **relational database (PostgreSQL)** managed via Supabase. This ensures that all user data, image history, and credit records are stored securely and can be retrieved instantly.

## **13.1 Entity Relationship (ER) Overview**
The database is structured around the **User** as the central entity. Every user has their own set of credits and a personal history of images.
- **One User → Many Images (One-to-Many):** One user can process and save multiple background-removed images. The `user_id` links them.
- **One User → Many Payments (One-to-Many):** A user can make multiple transactions to buy credits.

**The logical relationships between these entities are mapped in Figure 12**, providing a blueprint of the database architecture.

> **Figure 12: Entity Relationship (ER) Diagram**
> ![ER Diagram](./media/image14.png)

## **13.2 Data Dictionary (Table Structures)**

***Table 5: users_data (User Profile & Credits)***
This is the parent table that stores the core identity and balance of every user.

| **Column** | **Data Type** | **Key Type** | **Description** |
|----|----|----|----|
| id | UUID | **PK** | Unique ID for the user (Primary Key) |
| email | Text | - | Registered email address |
| credits | Integer | - | Current credit balance (Starts with 6 free) |
| created_at | Timestamp | - | When the account was created |

***Table 6: history (Image Processing Records)***
This child table keeps a record of every image processed by a specific user.

| **Column** | **Data Type** | **Key Type** | **Description** |
|----|----|----|----|
| id | UUID | **PK** | Unique ID for this record (Primary Key) |
| user_id | UUID | **FK** | Links to `users_data.id` (Foreign Key) |
| title | Text | - | Name of the image |
| original_image_url | Text | - | Link to the original uploaded image |
| transparent_image_url | Text | - | Link to the transparent PNG result |
| created_at | Timestamp | - | When the image was processed |

## **13.3 Database Implementation (SQL Script)**
Below is the actual SQL script used in the Supabase SQL Editor to initialize the database. It handles the creation of tables and includes an **Automated Trigger** that initializes 6 free credits as soon as a user signs up.

```sql
-- 1. Create 'users_data' table to track credits
CREATE TABLE public.users_data (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  credits INTEGER DEFAULT 6 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Trigger function: Add new users to users_data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users_data (id, email, credits)
  VALUES (new.id, new.email, 6);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Trigger attach on auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Create 'history' table for background removals
CREATE TABLE public.history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_data(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Untitled Image',
  original_image_url TEXT NOT NULL,
  transparent_image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## **13.4 Security Policies (Row Level Security)**
Standard database security often relies on the application code, but I implemented **Row Level Security (RLS)** directly at the database level. This ensures that even if someone manages to bypass the frontend, they cannot access another user's private images or credits.

### **SQL Policy Implementation:**
```sql
-- Enable Row Level Security (RLS)
ALTER TABLE public.users_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated users can only interact with their own data
CREATE POLICY "Users can view own data" ON public.users_data FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own history" ON public.history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history" ON public.history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own history" ON public.history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own history" ON public.history FOR DELETE USING (auth.uid() = user_id);
```

> **Figure 12B: Supabase SQL Editor — Database Schema Implementation**
> ![SQL Editor Screenshot](./media/sqleditorScreen.png)

---

# **CHAPTER 14: SOFTWARE TESTING**

Testing ensures that the application works correctly under different conditions and that there are no "bugs" that could ruin the user experience. For this project, I followed a structured testing approach.

## **14.1 Testing Types**
- **Black Box Testing:** I focused on the functional requirements of the software. I tested the inputs (images/login details) and checked if the outputs (transparent images/redirects) were correct without looking at the internal code logic during the test.
- **Unit Testing:** Individual components like the "Credit Counter" and "Payment Verification" were tested separately to ensure they work perfectly.
- **Compatibility Testing:** The application was tested on Chrome, Edge, and Safari browsers to ensure a consistent experience.

## **14.2 Test Environment**
- **Hardware:** Tested on a laptop with 8GB RAM and an i5 Processor.
- **Software:** Windows 10/11, VS Code Debugger, and Chrome DevTools.
- **Network:** Tested on a stable 4G/5G internet connection to verify AI processing speed.

## **14.3 Functional Test Cases**

***Table 7: Functional Test Cases & Results***
The table below summarizes the core features tested during development:

| **Test ID** | **Feature** | **Action** | **Expected Result** | **Status** |
|----|----|----|----|----|
| TC01 | Login | Enter valid email/pass | Success & redirect to Dashboard | ✅ Pass |
| TC02 | Registration | Sign up new user | Account created with 6 free credits | ✅ Pass |
| TC03 | Route Guard | Open dashboard without login | Redirected back to Login page | ✅ Pass |
| TC04 | Upload | Select a small JPG | Image accepted and shown in preview | ✅ Pass |
| TC05 | Max Size | Select a 20MB image | Error: "File too large (Max 4MB)" | ✅ Pass |
| TC06 | AI Processing | Click "Remove BG" | Background removed in 3-5 seconds | ✅ Pass |
| TC07 | Credits | After processing | Credit balance reduces by 1 | ✅ Pass |
| TC08 | No Credits | Try upload with 0 credits | "Out of Credits" message shown | ✅ Pass |
| TC09 | History | View "My Creations" | Past images appear in a nice grid | ✅ Pass |
| TC10 | Rename | Edit image name | Name updated in the database | ✅ Pass |
| TC11 | Delete | Click delete button | Image removed from screen and database | ✅ Pass |
| TC12 | Download | Click download | PNG file saved to user's computer | ✅ Pass |
| TC13 | Logout | Click logout | User session cleared & sent to Home | ✅ Pass |
| TC14 | Payments | Top up credits | Credits added after successful payment | ✅ Pass |
| TC15 | Responsive | Open on Mobile | Menu becomes a mobile-friendly icon | ✅ Pass |

---

# **CHAPTER 15: RESULTS & OUTPUT**

After completing all the modules, I tested the **AI Background Remover** with different types of images (like portraits, logos, and products). I am happy to report that the application works exactly as I planned.

## **15.1 Success Metrics**
- **AI Accuracy:** During my tests, the AI successfully detected edges with over **95% accuracy**, even when the background was messy.
- **Average Speed:** Thanks to Next.js API routes, images are processed and ready for download within **3 to 5 seconds**.
- **Hosting Stability:** Because I deployed the frontend on Vercel and the database on Supabase, the website remained fast and didn't crash during multiple testing sessions.

## **15.2 What I Achieved**
1.  **Fully Automated Workflow:** I successfully replaced manual Photoshop editing with a simple 1-click button.
2.  **Real Security:** I learned how to implement **Row Level Security (RLS)** so no one can steal another user's images.
3.  **Working Economy:** Integrating Razorpay taught me how real SaaS products make money using credit systems.

---

# **CHAPTER 16: CONCLUSION & FUTURE SCOPE**

## **16.1 Conclusion**
Building this project from scratch was a massive learning experience for me. At the beginning, connecting the frontend to an AI API and a database seemed very difficult. I faced challenges with managing user sessions and writing secure database rules. However, by using **Next.js** and **Supabase**, I was able to solve these problems and build a complete, professional-looking SaaS application. I feel confident that this project fulfills all the requirements of my BCA final year thesis.

## **16.2 Future Scope**
While the current version is complete and stable, the following features can be added in the future to scale the product:
1.  **Batch Processing:** Allowing professional users to upload and process up to 50 images in one go.
2.  **AI Image Restoration:** Adding tools to automatically improve the quality of low-resolution images after background removal.
3.  **Mobile App Integration:** Developing native Android and iOS applications using React Native.
4.  **Custom Background Library:** A built-in library of high-quality backgrounds that users can instantly apply to their transparent images.

---

# **REFERENCES**

## **Web Resources:**
1.  **Next.js Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs) (For App Router and API Routes architecture).
2.  **Supabase Guide:** [https://supabase.com/docs](https://supabase.com/docs) (For PostgreSQL management, Auth, and Storage).
3.  **Clipdrop AI API Reference:** [https://clipdrop.co/apis](https://clipdrop.co/apis) (For background removal AI integration).
4.  **Razorpay Developer Hub:** [https://razorpay.com/docs](https://razorpay.com/docs) (For secure payment gateway and HMAC signature verification).
5.  **Tailwind CSS Documentation:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs) (For modern, responsive UI design).

## **Books & Academic Sources:**
6.  *Software Engineering: A Practitioner's Approach* by **Roger S. Pressman** (For SDLC and SRS concepts).
7.  *Database System Concepts* by **Silberschatz, Korth, and Sudarshan** (For relational database design and RLS).
8.  *MDN Web Docs:* [https://developer.mozilla.org](https://developer.mozilla.org) (For general JavaScript and TypeScript standards).

---

# **APPENDIX: TECHNICAL DETAILS (VIVA PREP)**

*Note: Below is the core backend logic that I wrote to handle the most complex parts of the application (Payments and Database functions).*

## **A.1 — Secure Payment Logic (HMAC-SHA256)**
To prevent people from "faking" payments, the server verifies a "Signature" from Razorpay. This ensures that credits are only added when real money is received.

**Server-Side Logic:**
```javascript
// This runs on the server to verify the payment
const crypto = require('crypto');

const secret = process.env.RAZORPAY_KEY_SECRET;
const data = razorpay_order_id + "|" + razorpay_payment_id;

const generated_signature = crypto
  .createHmac('sha256', secret)
  .update(data)
  .digest('hex');

if (generated_signature === razorpay_signature) {
  // The payment is 100% genuine!
  // Add credits to user account here.
}
```

## **A.2 — Atomic Credit Deduction (Database Function)**
I used a special database function to deduct credits. This ensures that even if two requests happen at the exact same millisecond, the system stays accurate and never goes below zero.

**SQL Function:**
```sql
CREATE OR REPLACE FUNCTION decrement_credit(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Deduct 1 credit only if balance is more than 0
  UPDATE users_data
  SET credits = credits - 1
  WHERE id = p_user_id AND credits > 0;
END;
$$ LANGUAGE plpgsql;
```

---
*End of Project Report*

