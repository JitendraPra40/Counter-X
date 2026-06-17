## CounterX – Inventory Management Module

**Project**
**CounterX – AI Powered Virtual Cashier Platform**

**Module**

- Inventory Management
- Technology Stack
- Java 21
- Spring Boot 3.x
- Spring Data JPA
- Hibernate
- MySQL 8
- Maven

Use base URL:

`http://localhost:8080`

Headers for JSON requests:

```http
Content-Type: application/json
```

Because Spring Security is enabled, use Basic Auth unless you add a custom security config:

```text
Username: user
Password: check console log: "Using generated security password: ..."
```

**Inventory APIs**

`POST /api/inventory`

```json
{
  "itemName": "string",
  "category": "VEGETABLE",
  "unitType": "KG",
  "availableStock": 0,
  "pricePerUnit": 0,
  "receivedDate": "2026-06-08",
  "createdBy": "string",
  "updatedBy": "string"
}
```

`GET /api/inventory` 

No body.

`GET /api/inventory/{id}` 

No body.

`PUT /api/inventory/{id)`

```json
{
  "itemName": "string",
  "category": "VEGETABLE",
  "unitType": "KG",
  "availableStock": 0,
  "pricePerUnit": 0,
  "receivedDate": "2026-06-08",
  "createdBy": "string",
  "updatedBy": "string"
}
```

`DELETE /api/inventory/{id}`

No body.

**Dashboard APIs**

`GET /api/dashboard/inventory/summary`

No body for dashboard APIs.

Valid `category` values include: `VEGETABLE`, `FRUIT`, `DAIRY`, `GRAINS`, `PULSES`, `SPICES`, `OIL`, `BEVERAGE`, `MEAT`, `SEAFOOD`, `BAKERY`, `FROZEN_FOOD`, `PACKAGING`, `CLEANING_SUPPLIES`, `OTHER`.

Valid `unitType` values: `KG`, `GRAM`, `LTR`, `ML`, `PCS`, `PACK`, `BOX`, `BOTTLE`, `TRAY`.