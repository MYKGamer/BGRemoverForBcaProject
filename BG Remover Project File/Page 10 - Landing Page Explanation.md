# LANDING PAGE DETAILS

The Landing Page is the first point of contact for the user. It is designed to be visually striking and informative, using a **"Zinc/Slate"** dark theme and modern typography.

### Core Sections:
*   **Hero Section:** Highlights the primary value proposition with a bold headline and a "Get Started" CTA.
*   **Features Bento-Grid:** Displays the key selling points like AI accuracy, speed, and security using a modern grid layout.
*   **Before/After Slider:** An interactive component that shows the AI's power by comparing an original image with its background-removed version.
*   **Pricing Preview:** Gives users an immediate idea of the credit-based system.

### Key Logic:
The landing page checks the user's authentication state. If a user is already logged in, the "Get Started" button dynamically changes to "Go to Dashboard".

### Important Code Snippet:
```jsx
// Dynamic Routing Logic for Hero Section
const authRoute = user ? "/dashboard" : "/auth";

<Button asChild className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">
  <Link href={authRoute}>
    Get Started for Free
    <ArrowRight className="ml-2 h-4 w-4" />
  </Link>
</Button>
```
