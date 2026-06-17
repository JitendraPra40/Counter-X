# CounterX Backend API Documentation

Welcome to the backend API reference for CounterX—an AI-powered Self-Ordering Restaurant Platform. This document is designed for the frontend development team to facilitate UI building and integration.

---

## 🛠️ Global Configuration & Setup

### Base URL
* **Current Configured Address:** `http://localhost:8082` (configured in `application.properties`)
  > ⚠️ **Note:** The old `README.md` mentions `http://localhost:8080`. Please use port **`8082`** instead.

### Global Headers
* For all requests sending a body:
  ```http
  Content-Type: application/json
  ```
* For secured endpoints (requiring authentication):
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```

### Interactive API Explorer (Swagger / OpenAPI)
OpenAPI documentation and Swagger UI are enabled and publicly accessible:
* **Swagger UI:** [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)
* **OpenAPI Spec Json:** [http://localhost:8082/v3/api-docs](http://localhost:8082/v3/api-docs)

### Cross-Origin Resource Sharing (CORS)
CORS is globally configured in the backend to allow requests from **any origin** (`*`), with all headers and methods supported. You will not face CORS issues during local development.

---

## 🔐 Authentication & Roles

The system uses stateless **JWT (JSON Web Token)** authentication. 
* **Role Available:** `ROLE_ADMIN`
* **Public Endpoints:** Swagger UI docs, Register, Login, and Menu viewing (`GET` endpoints).
* **Secured (Authenticated) Endpoints:** Orders, Cart, Cart Items, and Payment submission.
* **Admin-Only Endpoints:** Inventory, Sales Reports, Dashboards, Kitchen orders management, Order Items management, and Menu CRUD (`POST`, `PUT`, `DELETE`).

### Authentication Behavior Notes
1. **Password Security:** Passwords are currently saved and checked in **plaintext** in the database (no BCrypt hashing is performed on the backend).
2. **Admin Limitation:** The registration endpoint has a hard limit of **2 registered admins**. If a registration request is sent when 2 admins already exist, the backend will return a `500` error: `"Only 2 Admins are allowed"`.

---

## 📋 API Endpoints Reference

### 1. Authentication (Admin Gateway)
* **Base Path:** `/api/auth`

| Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new Admin. |
| `POST` | `/login` | Public | Authenticate Admin and receive a JWT. |
| `GET` | `/{id}` | Authenticated | Get Admin profile by ID. |
| `GET` | `/` | Authenticated | Get all registered Admins. |
| `PUT` | `/{id}` | Authenticated | Update Admin profile information. |
| `DELETE` | `/{id}` | Authenticated | Delete Admin profile. |

#### Request Bodies

* **Admin Registration / Update (`AdminDTO`):**
  ```json
  {
    "username": "admin1", // Required, non-blank
    "email": "admin1@example.com", // Required, valid email format
    "password": "Password123" // Required, min 6 chars, must contain letters & numbers
  }
  ```

* **Admin Login (`LoginDTO`):**
  ```json
  {
    "username": "admin1",
    "password": "Password123"
  }
  ```

* **Authentication Response:**
  * Login returns a plain JWT text token string (e.g., `eyJhbGciOiJIUzI1NiJ9...`). Place this token in the header: `Authorization: Bearer <TOKEN>`.

---

### 2. Menu Management
* **Base Path:** `/api/menu`

| Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Get all menu items. |
| `GET` | `/available` | Public | Get only available menu items (Customer View). |
| `GET` | `/available/category/{category}` | Public | Get available menu items filtered by category. |
| `GET` | `/category/{category}` | Public | Get all menu items by category (includes unavailable). |
| `GET` | `/search/{itemName}` | Public | Search menu items by substring name match. |
| `GET` | `/{id}` | Public | Retrieve a specific menu item by ID. |
| `POST` | `/` | **Admin Only** | Add a new menu item. |
| `PUT` | `/{id}` | **Admin Only** | Update a menu item details. |
| `PUT` | `/availability/{itemName}/{available}`| **Admin Only** | Toggle availability of an item (by name). |
| `DELETE`| `/{id}` | **Admin Only** | Delete a menu item. |

#### Allowed Categories (`entity.Category`)
* `BREAKFAST`, `MEALS`, `SNACKS`, `DRINKS`, `DESSERT`

#### Request Payload (`MenuDto`):
```json
{
  "itemName": "Paneer Tikka", // Required, non-blank
  "description": "Spicy grilled paneer with veggies", // Required, non-blank
  "price": 220.0, // Required, minimum value: 1.0
  "category": "SNACKS", // Required, one of the Category values above
  "available": true, // Optional, defaults to true
  "imagePath": "https://example.com/paneer.jpg" // Optional, max 1000 characters
}
```

---

### 3. Shopping Cart Session
* **Base Path:** `/cart` & `/cart-items`
* **Authentication:** Authenticated Customer

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/cart` | Initialize/Create a new Cart. |
| `GET` | `/cart/{cartId}` | Retrieve a cart by its ID. |
| `GET` | `/cart` | Retrieve all shopping carts. |
| `DELETE` | `/cart/{cartId}` | Delete a specific cart. |
| `POST` | `/cart-items` | Add a food item to a cart. |
| `GET` | `/cart-items/{cartId}` | Get all items currently in a specific cart. |
| `GET` | `/cart-items` | Get all cart items across all carts. |
| `DELETE` | `/cart-items/{cartItemId}`| Remove a single item from the cart. |
| `DELETE` | `/cart-items/clear/{cartId}` | Clear all items and reset a cart. |
   
#### Request Payloads

* **Create Cart (`CartDTO`):**
  ```json
  {
    "totalAmount": 0.0 // Optional double
  }
  ```

* **Add Cart Item (`CartItemDTO`):**
  ```json
  {
    "cartId": 1, // Required Long
    "itemName": "Paneer Tikka", // Required String
    "quantity": 2, // Required Integer
    "price": 220.0 // Required Double
  }
  ```
  *(Note: The backend automatically computes `totalPrice = quantity * price` before persisting).*

---

### 4. Orders & Checkout Flow
* **Base Path:** `/api/orders`
* **Authentication:** Authenticated Customer (except for Admin-only management endpoints)

| Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Authenticated | Place a new order. |
| `GET` | `/` | **Admin Only** | Get all orders in system history. |
| `GET` | `/today` | **Admin Only**? | Get all orders placed today. |
| `GET` | `/{id}` | Authenticated | Get details of a specific order. |
| `PUT` | `/{orderId}/status/{status}` | **Admin Only** | Update status of order. |
| `PUT` | `/{orderId}/type/{orderType}` | **Admin Only** | Change order type. |

#### Order Enums
* **Order Types:** `DINE_IN`, `TAKE_AWAY`
* **Order Statuses:** `PENDING_PAYMENT`, `PLACED`, `PREPARING`, `READY`, `SERVED`, `CANCELLED`

#### Ordering Lifecycle Flow
1. **Place Order (`POST /api/orders`):**
   Frontend creates a pending order by submitting the cart totals and order type:
   ```json
   {
     "totalAmount": 440.0,
     "orderType": "DINE_IN"
   }
   ```
   *Response:* Returns the generated `Order` object. The order status is initially set to `PENDING_PAYMENT`, token number (`dailyOrderNumber`) defaults to `0`, and payment status defaults to `PENDING`.
   
2. **Add Order Items (`POST /order-items`):**
   For each item in the checked-out cart, the frontend must submit the order items linking back to the generated `orderId`:
   ```json
   {
     "orderId": 12,
     "itemName": "Paneer Tikka",
     "quantity": 2,
     "price": 220.0
   }
   ```
   *(Note: The Order Items endpoints have basic REST mappings `/order-items` supporting `GET`, `PUT`, and `DELETE` which require `ROLE_ADMIN` role, except for `POST` and `PUT` which are authenticated customer-facing).*

---

### 5. Payments & QR Codes
* **Base Path:** `/api/payments`
* **Authentication:** Authenticated Customer (except where noted)

| Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/qr/{orderId}` | **Admin Only** | Generate a UPI Payment QR Code (returns PNG image stream). |
| `POST` | `/` | Authenticated | Process/Simulate payment completion. |
| `GET` | `/{paymentId}` | **Admin Only** | Get details of a payment transaction. |
| `GET` | `/` | **Admin Only** | List all payment logs. |
| `GET` | `/order/{orderId}` | **Admin Only** | Get payments matching an order ID. |
| `GET` | `/transaction/{transactionId}` | **Admin Only** | Get payment matching unique Transaction ID. |

#### Payment Request Payload (`PaymentDTO`):
```json
{
  "orderId": 12,
  "paymentMethod": "UPI" // E.g., GPAY, PHONEPE, PAYTM, UPI
}
```
* **Post-Payment Side Effects:**
  When a successful payment is simulated via `POST /api/payments`:
  1. The transaction status is marked `SUCCESS` and logged with a transaction ID format `TXN-XXXXXXXX`.
  2. The related `Order` status is promoted to `PLACED`, and `paymentStatus` becomes `SUCCESS`.
  3. The daily token (`dailyOrderNumber`) is generated (running counter resetting daily).
  4. Daily revenue metrics are updated.
  5. **A customer bill is automatically generated.**

---

### 6. Bills & Receipts
* **Base Path:** `/api/bills`

| Method | Endpoint | Authentication | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/order/{orderId}` | Authenticated | Retrieve customer bill receipt by Order ID. |
| `GET` | `/{billId}` | **Admin Only** | Retrieve bill by Bill ID. |
| `GET` | `/token/{dailyOrderNumber}`| **Admin Only**| Find bills using token number. |
| `GET` | `/` | **Admin Only** | Fetch all generated bills. |

* **Bill Schema Fields:**
  * `billId`
  * `orderId`
  * `dailyOrderNumber`
  * `orderType`
  * `subTotal`
  * `gstAmount` (5% hardcoded calculated on subtotal)
  * `totalAmount` (subTotal + gstAmount)
  * `paymentStatus`
  * `billDateTime`

---

### 7. Kitchen Display System (KDS)
* **Base Path:** `/api/kitchen`
* **Authentication:** **Admin Only** (`ROLE_ADMIN`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/orders` | Fetch active kitchen orders to display on screen. |
| `PUT` | `/orders/{id}/status` | Update order status. Query parameter `status` is required (e.g. `PREPARING`, `READY`, `SERVED`, `CANCELLED`). |

---

### 8. Analytics & Admin Dashboards
* **Authentication:** **Admin Only** (`ROLE_ADMIN`)

| Path | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboard/today` | `GET` | Today's revenue, order counts. |
| `/api/dashboard/week` | `GET` | Aggregated revenue list for past week. |
| `/api/dashboard/month` | `GET` | Aggregated revenue list for past month. |
| `/api/admin/orders` | `GET` | Admin-level order status report list. |
| `/api/admin/top-items` | `GET` | Retrieve list of top-selling items with quantities. |
| `/api/admin/category-revenue`| `GET` | Category-wise revenue metrics. |
| `/api/sales/today` | `GET` | Detailed today sales entity (`DailyRevenue`). |
| `/api/sales/week` | `GET` | Daily revenue list for past 7 days. |
| `/api/sales/month` | `GET` | Daily revenue list for current month. |
| `/api/sales/top-items` | `GET` | Alternative path for top-selling items. |
| `/api/sales/categories` | `GET` | Alternative path for category revenue breakdown. |

---

### 9. Inventory Management
* **Base Path:** `/api/inventory` & `/api/dashboard/inventory`
* **Authentication:** **Admin Only** (`ROLE_ADMIN`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Create raw stock inventory item. |
| `GET` | `/` | List all active inventory items. |
| `GET` | `/{id}` | Get inventory details by ID. |
| `PUT` | `/{id}` | Update inventory stock details. |
| `DELETE` | `/{id}` | Soft delete inventory item (sets `deleted` to true). |
| `GET` | `/api/dashboard/inventory/summary` | Fetch dashboard inventory value summary. |

#### Allowed Categories (`enums.Category`)
* `VEGETABLE`, `FRUIT`, `DAIRY`, `GRAINS`, `PULSES`, `SPICES`, `OIL`, `BEVERAGE`, `MEAT`, `SEAFOOD`, `BAKERY`, `FROZEN_FOOD`, `PACKAGING`, `CLEANING_SUPPLIES`, `OTHER`
  > 📌 **Note:** This category list is distinct from the Menu category lists.

#### Allowed Unit Types (`enums.UnitType`)
* `KG`, `GRAM`, `LTR`, `ML`, `PCS`, `PACK`, `BOX`, `BOTTLE`, `TRAY`

#### Request Payload (`InventoryRequestDto`):
```json
{
  "itemName": "Onion", // Required, 2-255 characters
  "category": "VEGETABLE", // Required
  "unitType": "KG", // Required
  "availableStock": 150.5, // Required, >= 0
  "pricePerUnit": 40.0, // Required, > 0
  "receivedDate": "2026-06-15", // Required (yyyy-MM-dd)
  "createdBy": "AdminName", // Optional, 2-255 characters
  "updatedBy": "AdminName" // Optional, 2-255 characters
}
```

---
