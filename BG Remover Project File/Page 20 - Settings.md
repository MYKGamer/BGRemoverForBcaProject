# SETTINGS & USER PROFILE

The Settings page gives the logged-in user control over their account preferences and session management.

<br>
<br>
<br>
<br>

*(Paste Screenshot Here: The Settings page or modal showing the user's email, credit balance, and logout button)*

<br>
<br>
<br>

> **Figure 9:** Settings Panel — User profile information and account management options.

### Features:
*   **Profile Management:** View logged-in email and account details.
*   **Logout Functionality:** Securely clear the session and redirect to the landing page.
*   **Usage Tracking:** View total history count and current credit tier.

### Important Code Snippet:
```javascript
// Secure Logout
const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push('/');
  toast.success("Logged out successfully");
};
```
