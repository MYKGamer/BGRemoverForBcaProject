# HISTORY & DATA PERSISTENCE

A key feature of this SaaS is that users don't lose their work after closing the browser. All generations are stored securely in the cloud.

### Implementation Details:
*   **Database Table:** The `history` table stores the URLs of both original and transparent images.
*   **User-Based Filtering:** Row Level Security (RLS) ensures that a user can only see their own history.
*   **Real-time Management:** Users can delete their history, which triggers a cleanup of the physical files in Supabase Storage.

### Important Code Snippet:
```javascript
// Fetching User History from Supabase
const { data: historyItems, error } = await supabase
  .from('history')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

if (error) console.error("Error fetching history:", error);
```
