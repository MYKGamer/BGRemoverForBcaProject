# AI PROCESSING — SERVER-SIDE CODE

The background removal logic is handled entirely on the server inside a **Next.js API Route** (`/api/remove-bg/route.ts`). This ensures the `CLIPDROP_API_KEY` is never exposed to the browser.

---

### 1. Forwarding Image to Clipdrop AI API (Server-Side):

```typescript
// /src/app/api/remove-bg/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const imageFile = formData.get('image') as File;

  // Build the request for the Clipdrop API
  const clipdropForm = new FormData();
  clipdropForm.append('image_file', imageFile);

  const aiResponse = await fetch('https://clipdrop-api.co/remove-background/v1', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLIPDROP_API_KEY!, // Secure — server-side only
    },
    body: clipdropForm,
  });

  // Convert result to a buffer to upload to Supabase Storage
  const resultBuffer = await aiResponse.arrayBuffer();
  return new NextResponse(resultBuffer, {
    headers: { 'Content-Type': 'image/png' },
  });
}
```

---

### 2. Client-Side Image Download Functionality:

Once the transparent PNG URL is returned, the user can download it directly from the browser without any server involvement.

```typescript
// dashboard/editor.tsx — Download handler
const handleDownload = (url: string, filename: string = 'removed-bg.png') => {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
```

> **Note:** The credit deduction SQL function (`decrement_credit`) is documented in full in **Appendix A**.

