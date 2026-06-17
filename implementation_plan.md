# CounterX – React Frontend UI Implementation Plan

## Overview
**CounterX** is an AI-powered Self-Ordering Restaurant Platform. The frontend will serve two user types:
- **Customers** – Browse menu, add to cart, place orders, make payments, view bills
- **Admins** – Manage menu, view orders/kitchen display, handle inventory, view analytics/dashboard

Backend Base URL: `http://localhost:8082`

---

## Technology Stack
- **Framework:** React + Vite (fast dev server)
- **Routing:** React Router v6
- **State:** React Context API (auth) + local component state
- **HTTP Client:** Axios
- **Styling:** Vanilla CSS with CSS Variables (design system)
- **Icons:** Lucide React

---

## Project Structure

```
CounterX-Frontend/
├── src/
│   ├── api/                    # Axios API calls per module
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   └── admin.js
│   ├── context/
│   │   └── AuthContext.jsx     # JWT token management
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MenuCard.jsx
│   │   ├── CartDrawer.jsx
│   │   └── AdminSidebar.jsx
│   ├── pages/
│   │   ├── customer/
│   │   │   ├── HomePage.jsx       # Landing + Menu Browse
│   │   │   ├── MenuPage.jsx       # Full menu with category filter
│   │   │   ├── CartPage.jsx       # Cart review
│   │   │   ├── CheckoutPage.jsx   # Order placement + payment
│   │   │   └── BillPage.jsx       # Receipt after payment
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── Dashboard.jsx      # Revenue, order stats
│   │       ├── MenuManagement.jsx # CRUD for menu items
│   │       ├── OrdersPage.jsx     # All orders + status update
│   │       ├── KitchenDisplay.jsx # Live kitchen order board
│   │       ├── InventoryPage.jsx  # Inventory CRUD
│   │       └── SalesReport.jsx    # Analytics + charts
│   ├── index.css               # Global design system + CSS variables
│   └── main.jsx
```

---

## Design System
- **Color Palette:** Dark background (#0A0A0F) with vibrant orange/amber accent (#FF6B2B), green confirmations, red alerts
- **Typography:** Google Fonts – `Outfit` (headings), `Inter` (body)
- **Effects:** Glassmorphism cards, subtle gradient backgrounds, smooth hover animations
- **Responsive:** Mobile-first, breakpoints at 768px and 1200px

---

## Pages & Features

### Customer Pages
| Page | Key Features |
|------|-------------|
| **Home** | Hero section, featured items, category quick-links |
| **Menu** | Category filter tabs, item cards with image/price, search bar, Add to Cart |
| **Cart** | Item list with qty controls, subtotal, GST preview, checkout button |
| **Checkout** | Order type (Dine-in/Takeaway), payment method, confirm & pay |
| **Bill** | Order summary, token number, GST breakdown, receipt |

### Admin Pages
| Page | Key Features |
|------|-------------|
| **Login** | JWT auth form |
| **Dashboard** | Today's revenue, order count, weekly chart |
| **Menu Management** | Add/Edit/Delete menu items, toggle availability |
| **Orders** | Table of all orders, status update dropdown |
| **Kitchen Display** | Card-based live order board, status change buttons |
| **Inventory** | CRUD table for stock items |
| **Sales Report** | Top items, category revenue breakdown |

---

## API Integration
- Axios instance with base URL `http://localhost:8082`
- Auth interceptor to attach `Authorization: Bearer <token>` header
- Token stored in `localStorage` and managed via `AuthContext`

---

## Verification Plan
- Run `npm run dev` to verify no build errors
- Visually verify all pages render correctly
- Test responsive layout at mobile/tablet/desktop widths
- Test protected admin routes redirect to login if unauthenticated

---

## Open Questions

> [!IMPORTANT]
> **Should the Customer flow also require login/authentication?**
> The README says Cart & Orders endpoints require "Authenticated Customer" but there's no customer registration/login endpoint defined. Should the customer flow be session-based (no login needed) or require auth?

> [!IMPORTANT]
> **Should charts on the Dashboard & Sales pages use a charting library?** Options: Recharts, Chart.js, or just visual CSS bars (no extra dep). Please confirm preference.
