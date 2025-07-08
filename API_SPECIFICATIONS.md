# Pyramid CRM & Shopify Integration - API Specifications

## Overview

This document provides comprehensive API specifications for the Pyramid CRM & Shopify integration system. The integration enables bidirectional synchronization of customers, products, orders, and inventory between Pyramid CRM and Shopify.

### APIs to be Built in Pyramid CRM

These endpoints will be developed (or extended) within Pyramid CRM to enable integration and data synchronization:

- **Product Management APIs**
  - Create, update, delete, and fetch products
  - Store and manage Shopify product/variant IDs for mapping
- **Inventory Management APIs**
  - Update and fetch inventory quantities
  - Adjust inventory based on Shopify order events
- **Order Management APIs**
  - Create and update order records based on Shopify webhooks
  - Update order statuses (e.g., received, fulfilled)
- **Fulfillment APIs**
  - Process and update fulfillment status
  - Send fulfillment details to Shopify
- **Customer Management APIs**
  - Create, update, and fetch customer records
  - Update customer data based on Shopify webhook events
- **Webhook Endpoints**
  - Receive product, order, fulfillment, and customer updates from Shopify

### Shopify APIs Used by the Integration

The following standard Shopify REST API endpoints will be called by the integration:

- **Product APIs**
  - `POST /admin/api/products.json` – Create product in Shopify
  - `PUT /admin/api/products/{product_id}.json` – Update product
  - `DELETE /admin/api/products/{product_id}.json` – Delete product
  - `GET /admin/api/products/{product_id}.json` – Fetch product details
- **Inventory APIs**
  - `POST /admin/api/inventory_levels/set.json` – Set inventory level
  - `GET /admin/api/inventory_levels.json` – Fetch inventory levels
- **Order APIs**
  - `GET /admin/api/orders/{order_id}.json` – Fetch order details
  - `POST /admin/api/orders.json` – (if needed for order creation)
- **Fulfillment APIs**
  - `POST /admin/api/orders/{order_id}/fulfillments.json` – Create fulfillment
  - `GET /admin/api/orders/{order_id}/fulfillments.json` – Fetch fulfillment status
- **Customer APIs**
  - `GET /admin/api/customers/{customer_id}.json` – Fetch customer details
  - `PUT /admin/api/customers/{customer_id}.json` – Update customer
- **Webhooks**
  - Shopify will POST to Pyramid CRM endpoints for:
    - Product updates
    - Order creation/updates
    - Fulfillment events
    - Customer updates

These Shopify APIs are all standard, well-documented endpoints, ensuring compatibility and future extensibility.

## Authentication

All API endpoints require proper authentication. The system uses:

- OAuth 2.0 for Shopify API access
- HMAC verification for webhook security

## API Endpoints

### 1. Products Management

#### Get All Products

```http
GET /products
```

**Response:**

```json
[
  {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "sku": "string",
    "inventoryQuantity": "number",
    "images": ["string"],
    "variants": "object"
  }
]
```

#### Get Product by ID

```http
GET /products/{id}
```

#### Create Product

```http
POST /products
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "price": "number (required)",
  "sku": "string (optional)",
  "inventoryQuantity": "number (optional)",
  "images": ["string"] (optional),
  "variants": "object (optional)"
}
```

#### Update Product

```http
PUT /products/{id}
Content-Type: application/json
```

#### Delete Product

```http
DELETE /products/{id}
```

#### Sync Inventory

```http
PATCH /products/{id}/inventory
Content-Type: application/json
```

**Request Body:**

```json
{
  "quantity": "number"
}
```

### 2. Orders Management

#### Get All Orders

```http
GET /orders
```

#### Get Order by ID

```http
GET /orders/{id}
```

#### Create Order

```http
POST /orders
Content-Type: application/json
```

#### Update Order

```http
PATCH /orders/{id}
Content-Type: application/json
```

#### Delete Order

```http
DELETE /orders/{id}
```

### 3. Customers Management

#### Get All Customers

```http
GET /customers
```

#### Get Customer by ID

```http
GET /customers/{id}
```

#### Create Customer

```http
POST /customers
Content-Type: application/json
```

#### Update Customer

```http
PATCH /customers/{id}
Content-Type: application/json
```

#### Delete Customer

```http
DELETE /customers/{id}
```

### 4. Inventory Management

#### Get All Inventory

```http
GET /inventory
```

#### Get Inventory by ID

```http
GET /inventory/{id}
```

#### Create Inventory

```http
POST /inventory
Content-Type: application/json
```

#### Update Inventory

```http
PATCH /inventory/{id}
Content-Type: application/json
```

#### Delete Inventory

```http
DELETE /inventory/{id}
```

### 5. Webhooks (Shopify Integration)

#### Product Update Webhook

```http
POST /webhooks/products/update
Content-Type: application/json
```

**Purpose**: Receives product updates from Shopify

#### Order Create Webhook

```http
POST /webhooks/orders/create
Content-Type: application/json
```

**Purpose**: Receives new order notifications from Shopify

#### Customer Update Webhook

```http
POST /webhooks/customers/update
Content-Type: application/json
```

**Purpose**: Receives customer updates from Shopify

## Shopify API Integration

### Standard Shopify API Usage

The integration uses the **official Shopify API** (v7.7.0) with the following capabilities:

- **Products**: Create, update, delete, and sync products
- **Inventory**: Real-time inventory level management
- **Orders**: Order processing and fulfillment
- **Customers**: Customer data synchronization

### Shopify API Endpoints Used

- `POST /admin/api/products` - Create products
- `PUT /admin/api/products/{id}` - Update products
- `DELETE /admin/api/products/{id}` - Delete products
- `PUT /admin/api/inventory_levels/set` - Update inventory
- Webhook endpoints for real-time updates

### Authentication Flow

1. OAuth 2.0 authentication with Shopify
2. Access token management for API calls
3. HMAC verification for webhook security

## Data Synchronization

### Bidirectional Sync

- **Pyramid CRM → Shopify**: Product creation, updates, inventory changes
- **Shopify → Pyramid CRM**: Order notifications, customer updates, inventory changes

### Real-time Updates

- Webhook-based real-time synchronization
- Automatic inventory level updates
- Order status tracking
- Customer data synchronization

## Integration Capabilities

### For Other Shopify Partners

This integration can be applied to other customers using Shopify through different partners because:

1. **Standard Shopify API**: Uses official Shopify REST API
2. **Generic Implementation**: Not tied to specific partner requirements
3. **Configurable**: Environment-based configuration
4. **Scalable**: Can handle multiple Shopify stores
5. **Extensible**: Modular architecture for easy customization
