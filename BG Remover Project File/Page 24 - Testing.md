# SOFTWARE TESTING

Testing is a critical phase of the Software Development Life Cycle (SDLC). This project was tested at multiple levels to verify correctness, stability, and security.

### Testing Methodology

*   **Black Box Testing:** Testing the application from the user's perspective without knowledge of internal code. Used for UI, functional, and integration tests.
*   **White Box Testing:** Testing with full knowledge of the code. Used to verify API routes, credit deduction logic, and payment verification functions.

---

### Functional Test Cases (Black Box)

| Test ID | Feature | Input / Action | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC01 | User Registration | New email + password | Account created, 6 credits assigned, redirect to dashboard. | As expected | ✅ Pass |
| TC02 | User Login | Valid email/password | Successful login, session established. | As expected | ✅ Pass |
| TC03 | Invalid Login | Wrong password | Error message: "Invalid credentials" displayed. | As expected | ✅ Pass |
| TC04 | Route Protection | Access `/dashboard` without login | Automatically redirected to `/login`. | As expected | ✅ Pass |
| TC05 | Image Upload (Valid) | 3MB JPG file | File accepted, uploaded to cloud storage. | As expected | ✅ Pass |
| TC06 | Image Upload (Oversized) | 15MB PNG file | Error: "Image too large. Max 10MB allowed." | As expected | ✅ Pass |
| TC07 | AI Processing | Valid uploaded image | Background removed, transparent PNG returned in 3-5 sec. | As expected | ✅ Pass |
| TC08 | Credit Deduction | After processing | User's credit balance reduces by 1. | As expected | ✅ Pass |
| TC09 | Zero Credits Guard | Upload image with 0 credits | Error Toast: "Out of Credits. Please top up." | As expected | ✅ Pass |
| TC10 | History Display | Login after processing | Past creations displayed in grid layout. | As expected | ✅ Pass |
| TC11 | Image Rename | Edit title & save | Title updated in database and reflected on screen. | As expected | ✅ Pass |
| TC12 | Image Delete | Click delete + confirm | File removed from storage & DB row deleted. | As expected | ✅ Pass |
| TC13 | Image Download | Click download button | High-res PNG saved to user's device. | As expected | ✅ Pass |
| TC14 | Payment (Razorpay) | Select plan + complete payment | Credits added to account, payment logged in DB. | As expected | ✅ Pass |
| TC15 | Responsive UI | Open on mobile device (375px) | Sidebar collapses, layout adapts correctly. | As expected | ✅ Pass |

---

### Test Summary

| Test Category | Total Tests | Passed | Failed |
| :--- | :--- | :--- | :--- |
| Authentication & Access | 4 | 4 | 0 |
| Image Upload & Processing | 3 | 3 | 0 |
| Credits & Billing | 3 | 3 | 0 |
| History Management | 3 | 3 | 0 |
| Payments | 1 | 1 | 0 |
| UI & Responsiveness | 1 | 1 | 0 |
| **Total** | **15** | **15** | **0** |

### Testing Environment
*   **Browser:** Google Chrome v124+, Mozilla Firefox v125+, Microsoft Edge.
*   **Operating System:** Windows 11, Android 14, iOS 17.
*   **Network:** Tested on both broadband and 4G mobile network connections.
