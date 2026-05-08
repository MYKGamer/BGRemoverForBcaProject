# DASHBOARD ARCHITECTURE

The Dashboard serves as the central hub for user activities. It is built using a **Shell Pattern** where a persistent sidebar wraps the dynamic content.

### Dashboard Features:
*   **Sidebar Navigation:** Quick access to Editor, History, Pricing, and Settings.
*   **Responsive Layout:** The sidebar collapses on mobile devices into a sheet/hamburger menu for better UX.
*   **Credit Display:** A prominent "Zap" icon displays the user's remaining credits, which updates in real-time after processing.
*   **Views System:** Instead of full page reloads, the dashboard uses a state-based view system (SPA feel) to switch between different tools.

### Important Code Snippet:
```jsx
// Sidebar Navigation Component
const menuItems = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'editor', label: 'BG Editor', icon: Wand2 },
  { id: 'history', label: 'My Creations', icon: History },
];

{menuItems.map((item) => (
  <Button
    key={item.id}
    variant={activeView === item.id ? "secondary" : "ghost"}
    onClick={() => setActiveView(item.id)}
  >
    <item.icon className="h-5 w-5 mr-3" />
    {item.label}
  </Button>
))}
```
