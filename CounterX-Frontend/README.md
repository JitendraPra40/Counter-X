# CounterX Frontend — Developer Guide

> AI-Powered Self-Ordering Restaurant Platform  
> Built with **React + Vite** · **Vanilla CSS** · **React Router v6** · **Axios**

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Project Structure](#2-project-structure)
3. [Design System](#3-design-system)
4. [Routing & Navigation](#4-routing--navigation)
5. [State Management](#5-state-management)
6. [API Layer](#6-api-layer)
7. [Components Reference](#7-components-reference)
8. [Customer Pages](#8-customer-pages)
9. [Admin Pages](#9-admin-pages)
10. [Adding New Features](#10-adding-new-features)
11. [Environment & Configuration](#11-environment--configuration)

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ installed
- CounterX Backend running on `http://localhost:8082`

### Run the Frontend

```bash
# Navigate to frontend directory
cd CounterX-Frontend

# Install dependencies (already done)
npm install

# Start development server
npm run dev
# → Opens at http://localhost:5173

# Build for production
npm run build
```

> [!IMPORTANT]
> The backend **must** be running at `http://localhost:8082` before using authenticated features (admin login, cart, orders). Public menu browsing works without the backend via graceful fallbacks.

---

## 2. Project Structure

```
CounterX-Frontend/
├── index.html                  # HTML shell — fonts, meta, title
├── vite.config.js              # Vite configuration
├── package.json
└── src/
    ├── main.jsx                # App entry point — providers & router mount
    ├── App.jsx                 # Route definitions
    ├── index.css               # 🎨 Global design system (CSS variables, utilities)
    │
    ├── api/                    # Axios API call modules
    │   ├── axiosInstance.js    # Base Axios config + JWT interceptor
    │   ├── auth.js             # Admin auth endpoints
    │   ├── menu.js             # Menu endpoints
    │   ├── cart.js             # Cart & cart-items endpoints
    │   ├── orders.js           # Orders, payments, bills, kitchen
    │   └── admin.js            # Dashboard, inventory, analytics
    │
    ├── context/
    │   └── AuthContext.jsx     # JWT + admin state (React Context)
    │
    ├── components/
    │   ├── Navbar.jsx / .css           # Customer top navigation bar
    │   ├── AdminSidebar.jsx / .css     # Admin collapsible sidebar
    │   └── MenuCard.jsx / .css         # Reusable menu item card
    │
    └── pages/
        ├── customer/
        │   ├── HomePage.jsx / .css     # Landing page + hero
        │   ├── MenuPage.jsx / .css     # Menu browser
        │   ├── CartPage.jsx / .css     # Shopping cart
        │   ├── CheckoutPage.jsx / .css # Order + payment
        │   └── BillPage.jsx / .css     # Receipt / bill
        └── admin/
            ├── AdminLogin.jsx / .css   # JWT login form
            ├── Dashboard.jsx           # Revenue stats + chart
            ├── MenuManagement.jsx      # Menu CRUD
            ├── OrdersPage.jsx          # All orders + status update
            ├── KitchenDisplay.jsx      # Live kitchen board
            ├── InventoryPage.jsx       # Inventory CRUD
            ├── SalesReport.jsx         # Analytics
            └── AdminPages.css          # Shared admin styles
```

---

## 3. Design System

All design tokens are CSS custom properties defined in [`src/index.css`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/index.css).

### Color Palette

| Variable | Value | Usage |
|---|---|---|
| `--color-bg` | `#07080F` | Page background |
| `--color-bg-2` | `#0D0E1A` | Secondary background (sidebar, footer) |
| `--color-surface` | `#12132A` | Cards, panels |
| `--color-surface-2` | `#1A1B35` | Input backgrounds, hover states |
| `--color-primary` | `#FF6B2B` | Primary accent (orange) |
| `--color-primary-glow` | `rgba(255,107,43,0.25)` | Glow shadows, active backgrounds |
| `--color-secondary` | `#7C3AED` | Secondary accent (purple) |
| `--color-accent` | `#F59E0B` | Gradient endpoints (amber) |
| `--color-success` | `#10B981` | Confirmations, available status |
| `--color-warning` | `#F59E0B` | Pending/preparing status |
| `--color-danger` | `#EF4444` | Errors, cancelled, delete |
| `--color-info` | `#3B82F6` | Info badges, placed orders |
| `--color-text` | `#F1F2FF` | Primary text |
| `--color-text-2` | `#9BA3C8` | Secondary text, descriptions |
| `--color-text-3` | `#5B6190` | Muted text, labels |

### Typography

```css
--font-head: 'Outfit', sans-serif;   /* Headings, numbers, logo */
--font-body: 'Inter', sans-serif;    /* Body text, labels, buttons */
```

Loaded from Google Fonts in [`index.html`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/index.html).

### Utility Classes

```css
/* Gradient text (orange → amber) */
.gradient-text

/* Layout */
.container          /* Max 1280px, centered */
.page-content       /* Adds top padding for fixed navbar */

/* Buttons */
.btn .btn-primary   /* Orange gradient, glow shadow */
.btn .btn-secondary /* Surface bg, outlined */
.btn .btn-ghost     /* Transparent, bordered */
.btn .btn-danger    /* Red tinted */
.btn .btn-success   /* Green tinted */
.btn-sm / .btn-lg   /* Size modifiers */
.btn-icon           /* Square icon button */

/* Cards */
.card               /* Surface background + border */
.card-glass         /* Glassmorphism blur effect */

/* Badges */
.badge .badge-primary / success / warning / danger / info / purple

/* Status chips (with dot indicator) */
.status-chip .status-placed / preparing / ready / served / cancelled / pending

/* Form */
.form-group / .form-label / .form-control

/* Grids */
.grid-2 / .grid-3 / .grid-4    /* Responsive auto-fill grids */
.stats-grid                     /* 4-col stats row */

/* Stat cards */
.stat-card / .stat-icon / .stat-value / .stat-label

/* Quantity control */
.qty-control / .qty-btn / .qty-value

/* Category filter pills */
.category-pills / .category-pill / .category-pill.active

/* Search bar */
.search-bar

/* Tables */
.table-wrapper / .cx-table

/* Modal */
.modal-overlay / .modal-box / .modal-header / .modal-title

/* Alerts */
.alert .alert-success / alert-error / alert-info

/* Loading */
.spinner / .loading-state / .empty-state

/* Animations */
.animate-fadeIn / .animate-slideUp / .pulse
```

### Animations

| Keyframe | Usage |
|---|---|
| `fadeIn` | Page-level elements on mount |
| `slideUp` | Modals, cards appearing from below |
| `slideIn` | Drawer/sidebar from the right |
| `spin` | Loading spinner |
| `pulse` | Success icon heartbeat |

---

## 4. Routing & Navigation

Defined in [`src/App.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/App.jsx).

### Customer Routes (Public)

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page, featured items |
| `/menu` | `MenuPage` | Full menu with filters |
| `/menu?category=MEALS` | `MenuPage` | Pre-filtered by category |
| `/cart` | `CartPage` | Shopping cart |
| `/checkout` | `CheckoutPage` | Order type + payment |
| `/bill/:orderId` | `BillPage` | Order receipt |

### Admin Routes (Protected)

| Path | Component | Guard |
|---|---|---|
| `/admin/login` | `AdminLogin` | Public |
| `/admin/dashboard` | `Dashboard` | `ProtectedRoute` |
| `/admin/menu` | `MenuManagement` | `ProtectedRoute` |
| `/admin/orders` | `OrdersPage` | `ProtectedRoute` |
| `/admin/kitchen` | `KitchenDisplay` | `ProtectedRoute` |
| `/admin/inventory` | `InventoryPage` | `ProtectedRoute` |
| `/admin/sales` | `SalesReport` | `ProtectedRoute` |

> [!NOTE]
> `ProtectedRoute` checks `isAuthenticated` from `AuthContext`. If not logged in, it redirects to `/admin/login`. Any unmatched URL falls back to `/`.

---

## 5. State Management

### Authentication — `AuthContext`

File: [`src/context/AuthContext.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/context/AuthContext.jsx)

```jsx
import { useAuth } from './context/AuthContext';

const { token, admin, login, logout, isAuthenticated } = useAuth();

// Login: store JWT + admin info
login(jwtString, { username: 'admin1' });

// Logout: clears token + localStorage
logout();
```

Storage: `localStorage.cx_token` (JWT), `localStorage.cx_admin` (admin object JSON).

### Cart — localStorage

The cart is stored entirely in `localStorage` under the key `cx_cart_items` as a JSON array:

```js
// Structure of each cart item
[
  { itemName: "Paneer Tikka", quantity: 2, price: 220.0, imagePath: "..." },
  ...
]
```

Components listen for the **custom event** `cartUpdated` to sync the cart badge count:

```js
// Trigger cart refresh across all components
window.dispatchEvent(new Event('cartUpdated'));

// Listen in a component
window.addEventListener('cartUpdated', updateCartCount);
```

This is used in `Navbar.jsx`, `CartPage.jsx`, `MenuPage.jsx`, and `HomePage.jsx`.

---

## 6. API Layer

### Axios Instance

File: [`src/api/axiosInstance.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/axiosInstance.js)

```js
const api = axios.create({
  baseURL: 'http://localhost:8082',
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attaches JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cx_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Module Reference

| File | Functions | Endpoint Prefix |
|---|---|---|
| [`auth.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/auth.js) | `loginAdmin`, `registerAdmin`, `getAllAdmins`, `getAdminById`, `updateAdmin`, `deleteAdmin` | `/api/auth` |
| [`menu.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/menu.js) | `getAllMenuItems`, `getAvailableMenuItems`, `getMenuByCategory`, `searchMenu`, `addMenuItem`, `updateMenuItem`, `toggleMenuAvailability`, `deleteMenuItem` | `/api/menu` |
| [`cart.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/cart.js) | `createCart`, `getCartById`, `deleteCart`, `addCartItem`, `getCartItems`, `removeCartItem`, `clearCart` | `/cart`, `/cart-items` |
| [`orders.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/orders.js) | `placeOrder`, `getAllOrders`, `getOrderById`, `updateOrderStatus`, `addOrderItem`, `processPayment`, `getBillByOrderId`, `getKitchenOrders`, `updateKitchenOrderStatus` | `/api/orders`, `/api/payments`, `/api/bills`, `/api/kitchen` |
| [`admin.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/admin.js) | `getDashboardToday`, `getDashboardWeek`, `getDashboardMonth`, `getTopItems`, `getCategoryRevenue`, `getInventory`, `createInventoryItem`, `updateInventoryItem`, `deleteInventoryItem` | `/api/dashboard`, `/api/admin`, `/api/inventory` |

### Usage Pattern

```jsx
import { getAvailableMenuItems } from '../../api/menu';

useEffect(() => {
  getAvailableMenuItems()
    .then(res => setItems(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);
```

---

## 7. Components Reference

### `Navbar`

File: [`src/components/Navbar.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/components/Navbar.jsx)

- Fixed top navbar with glassmorphism effect on scroll
- Shows cart count badge (reads from `localStorage`, listens to `cartUpdated` event)
- Responsive: collapses to hamburger menu on mobile (`≤768px`)
- No props required

```jsx
import Navbar from './components/Navbar';
<Navbar />   // Placed by App.jsx wrapping customer routes
```

### `AdminSidebar`

File: [`src/components/AdminSidebar.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/components/AdminSidebar.jsx)

| Prop | Type | Description |
|---|---|---|
| `mobileOpen` | `boolean` | Controls mobile slide-in state |
| `onClose` | `function` | Callback to close the sidebar |

```jsx
const [sidebarOpen, setSidebarOpen] = useState(false);

<AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
```

Every admin page manages its own `sidebarOpen` state and passes it to `AdminSidebar`. The hamburger `Menu` button in each page's topbar calls `setSidebarOpen(true)`.

### `MenuCard`

File: [`src/components/MenuCard.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/components/MenuCard.jsx)

| Prop | Type | Description |
|---|---|---|
| `item` | `object` | Menu item from API (see schema below) |
| `onAdd` | `function(item)` | Called when "Add" is clicked, receives item + chosen quantity |

```jsx
<MenuCard
  item={{ id, itemName, description, price, category, available, imagePath }}
  onAdd={(itemWithQty) => addToLocalCart(itemWithQty)}
/>
```

Features: category color badge, image zoom on hover, qty stepper, animated "Added ✓" button state, unavailable overlay.

---

## 8. Customer Pages

### `HomePage`

File: [`src/pages/customer/HomePage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/customer/HomePage.jsx)

- **Hero section** with animated background blobs + grid pattern
- **Category quick links** → navigate to `/menu?category=X`
- **Featured items** → fetches first 4 available items via `getAvailableMenuItems()`
- **Features section** and **CTA banner**
- Cart additions go directly to `localStorage`

### `MenuPage`

File: [`src/pages/customer/MenuPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/customer/MenuPage.jsx)

- Reads `?category=` query param on mount to pre-select a category
- Category pills filter via `getMenuByCategory(cat)` or `getAvailableMenuItems()` for "ALL"
- Search form calls `searchMenu(query)` on submit; clear button resets to category view
- Cart badge in header updates via `cartUpdated` event

### `CartPage`

File: [`src/pages/customer/CartPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/customer/CartPage.jsx)

- Reads entirely from `localStorage.cx_cart_items` — no API calls
- Qty increment/decrement updates localStorage + fires `cartUpdated`
- Calculates: `subtotal`, `gst = subtotal × 5%`, `total`
- Passes `{ cartItems, subtotal, gst, total }` as `location.state` to `/checkout`

### `CheckoutPage`

File: [`src/pages/customer/CheckoutPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/customer/CheckoutPage.jsx)

**Complete checkout flow on submit:**

```
1. POST /api/orders/       → creates order (PENDING_PAYMENT)
2. POST /order-items       → one call per cart item
3. POST /api/payments/     → processes payment (promotes order to PLACED)
4. Clear localStorage cart
5. Navigate to /bill/:orderId
```

Order types: `DINE_IN` | `TAKE_AWAY`  
Payment methods: `UPI` | `GPAY` | `PHONEPE` | `PAYTM`

### `BillPage`

File: [`src/pages/customer/BillPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/customer/BillPage.jsx)

- Reads `orderId` from route params
- Calls `GET /api/bills/order/:orderId`
- Displays token number, order type, payment status, subtotal, GST, total
- Pulsing green checkmark animation on success

---

## 9. Admin Pages

> [!NOTE]
> All admin pages require a valid JWT token. Access is guarded by `ProtectedRoute` in `App.jsx`. Login at `/admin/login`.

### `AdminLogin`

File: [`src/pages/admin/AdminLogin.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/AdminLogin.jsx)

- Posts `{ username, password }` to `POST /api/auth/login`
- Response is a **plain JWT string** (not JSON) — stored via `login(jwt, adminData)`
- Show/hide password toggle built in

### `Dashboard`

File: [`src/pages/admin/Dashboard.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/Dashboard.jsx)

| Section | API | Display |
|---|---|---|
| Stats row | `GET /api/dashboard/today` | Revenue, orders, avg value, pending |
| Bar chart | `GET /api/dashboard/week` | 7-day CSS bar chart (no lib) |
| Top items | `GET /api/admin/top-items` | Progress bar list |

### `MenuManagement`

File: [`src/pages/admin/MenuManagement.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/MenuManagement.jsx)

| Action | API Call |
|---|---|
| Load all items | `GET /api/menu/` |
| Add item | `POST /api/menu/` |
| Edit item | `PUT /api/menu/:id` |
| Delete item | `DELETE /api/menu/:id` |
| Toggle availability | `PUT /api/menu/availability/:name/:bool` |

### `OrdersPage`

File: [`src/pages/admin/OrdersPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/OrdersPage.jsx)

- Loads all orders via `GET /api/orders/`
- Filter pills for: ALL, PLACED, PREPARING, READY, SERVED, CANCELLED, PENDING_PAYMENT
- Inline `<select>` per row calls `PUT /api/orders/:id/status/:status`

### `KitchenDisplay`

File: [`src/pages/admin/KitchenDisplay.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/KitchenDisplay.jsx)

- Loads via `GET /api/kitchen/orders`
- **Auto-refreshes every 30 seconds** via `setInterval`
- Card top border color = current order status color
- Status buttons call `PUT /api/kitchen/orders/:id/status?status=X`

### `InventoryPage`

File: [`src/pages/admin/InventoryPage.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/InventoryPage.jsx)

- Full CRUD for stock items
- Low stock highlight: stock `< 10` shows in red
- Categories: `VEGETABLE, FRUIT, DAIRY, GRAINS, PULSES, SPICES, OIL, BEVERAGE, MEAT, SEAFOOD, BAKERY, FROZEN_FOOD, PACKAGING, CLEANING_SUPPLIES, OTHER`
- Unit types: `KG, GRAM, LTR, ML, PCS, PACK, BOX, BOTTLE, TRAY`

### `SalesReport`

File: [`src/pages/admin/SalesReport.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/pages/admin/SalesReport.jsx)

| Section | API |
|---|---|
| Today stats | `GET /api/dashboard/today` |
| Weekly bar chart | `GET /api/dashboard/week` |
| Top selling items | `GET /api/admin/top-items` |
| Category breakdown | `GET /api/admin/category-revenue` |

---

## 10. Adding New Features

### Add a New Customer Page

1. Create `src/pages/customer/MyPage.jsx` and `MyPage.css`
2. Add route in [`App.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/App.jsx):
   ```jsx
   <Route path="/my-page" element={<><Navbar /><MyPage /></>} />
   ```
3. Add link to `Navbar.jsx` `navLinks` array

### Add a New Admin Page

1. Create `src/pages/admin/MyAdminPage.jsx`
2. Import `AdminPages.css` and use `AdminSidebar`
3. Add route in [`App.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/App.jsx):
   ```jsx
   <Route path="/admin/my-page" element={<ProtectedRoute><MyAdminPage /></ProtectedRoute>} />
   ```
4. Add nav item in [`AdminSidebar.jsx`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/components/AdminSidebar.jsx) `navItems` array

### Add a New API Call

```js
// src/api/menu.js
export const getMenuItemsBySearch = (query) => api.get(`/api/menu/search/${query}`);
```

### Add a New CSS Component

Add to [`src/index.css`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/index.css) using existing CSS variables:

```css
.my-component {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text);
  transition: all var(--transition);
}
```

---

## 11. Environment & Configuration

### Base URL

The backend URL is hardcoded in [`src/api/axiosInstance.js`](file:///c:/Users/User/Desktop/Counter-X/CounterX-Frontend/src/api/axiosInstance.js):

```js
baseURL: 'http://localhost:8082'
```

To change it for different environments, replace with a Vite env variable:

```js
// axiosInstance.js
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082'
```

```bash
# .env.local
VITE_API_BASE_URL=https://your-production-api.com
```

### CORS

The backend is already configured to allow all origins (`*`), so no proxy setup is needed in `vite.config.js` for local development.

### Key `localStorage` Keys

| Key | Content |
|---|---|
| `cx_token` | JWT string |
| `cx_admin` | JSON `{ username }` |
| `cx_cart_items` | JSON array of cart item objects |

### Unique Element IDs (for Testing)

All interactive elements have unique `id` attributes for automated UI testing:

| ID | Element |
|---|---|
| `hero-order-btn` | Hero "Browse Menu" CTA |
| `navbar-cart-btn` | Navbar cart icon |
| `menu-search-input` | Menu search field |
| `cat-pill-{CATEGORY}` | Category filter pills |
| `add-to-cart-{id}` | Add to Cart buttons |
| `cart-checkout-btn` | Cart → Checkout button |
| `checkout-confirm-btn` | Final "Confirm & Pay" button |
| `admin-login-submit` | Admin login submit |
| `admin-logout-btn` | Admin sidebar logout |
| `add-menu-item-btn` | Add menu item button |
| `save-menu-btn` | Save menu item in modal |
| `add-inventory-btn` | Add inventory item button |
| `kitchen-{id}-{status}` | Kitchen status action buttons |

---

*CounterX Frontend · Built with React + Vite · © 2026*
