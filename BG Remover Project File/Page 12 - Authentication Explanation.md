# AUTHENTICATION & SECURITY

Authentication is a critical component of any SaaS. We utilize **Supabase Auth** to provide a secure and scalable login system.

### Authentication Strategy:
*   **Email/Password:** Traditional login for standard users.
*   **Session Management:** Uses secure HTTP-only cookies to persist user sessions across the dashboard.
*   **Protected Routes:** Middleware is implemented to ensure that unauthenticated users cannot access private pages like `/dashboard`.

### User Onboarding:
When a user signs up for the first time, a PostgreSQL trigger automatically creates a row in the `users_data` table and assigns **6 free credits** to their account for the college demo.

### Important Code Snippet:
```javascript
// Supabase Login Functionality
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'example@email.com',
  password: 'securepassword123',
})

if (error) {
  toast.error(error.message);
} else {
  router.push('/dashboard');
}
```
