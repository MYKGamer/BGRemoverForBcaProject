# THE AI PROCESSING ENGINE

This is the core module of the project. It handles image ingestion, server-side AI communication, and result delivery. A strict **client-server separation** is maintained — the client never communicates with the Clipdrop API directly, preventing any API key exposure.

### Processing Workflow:
1.  **File Selection:** The user drags and drops, or clicks to select an image (JPG/PNG/WEBP, up to 10MB).
2.  **Client-Side Validation:** The file size and type are validated in the browser before any upload begins.
3.  **Credit Verification:** Before calling the API, the server checks the user's credit balance in the database. If `credits < 1`, the request is rejected immediately.
4.  **Server-Side AI Call:** The image is forwarded from the Next.js API Route to the Clipdrop API using a secret key stored only in server environment variables (`.env.local`).
5.  **Cloud Storage:** Both the original and the transparent result images are saved to the Supabase Storage bucket.
6.  **Database Log & Credit Deduction:** A record is inserted into the `history` table, and 1 credit is atomically deducted using a PostgreSQL RPC function.

### Security Design:
The `CLIPDROP_API_KEY` is stored as a server-side environment variable. It is never sent to the browser. Any direct call to the API without a valid user session is rejected by the server.

### Frontend to API Route — Code Snippet:
```typescript
// dashboard/editor.tsx — Submitting image to server API Route
const formData = new FormData();
formData.append('image', selectedFile);

const response = await fetch('/api/remove-bg', {
  method: 'POST',
  body: formData,
  // No API keys here — security is handled server-side via Supabase session
});

const result = await response.json();
if (result.success) {
  setResultUrl(result.transparentUrl);
  toast.success("Background removed successfully!");
} else {
  toast.error(result.error || "Processing failed.");
}
```

