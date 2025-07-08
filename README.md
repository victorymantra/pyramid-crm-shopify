# Pyramid CRM & Shopify Integration (Prototype)

This repository is a **Node.js/NestJS + React prototype** for integrating Pyramid CRM with Shopify, enabling bidirectional data synchronization for products, inventory, orders, and customer data.

> **Note:** This is a template/prototype for reference and demonstration purposes only. It is **not production-ready**.

## Features

- Product Management (CRUD, sync with Shopify)
- Inventory Synchronization (real-time updates)
- Order Processing (webhook-driven sync)
- Fulfillment Management
- Customer Data Synchronization
- Shopify Webhook Handling
- Modern React frontend (Ant Design)

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**
   Create a `.env` file with the following variables:

```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_SHOP_URL=your_shop_url
SHOPIFY_ACCESS_TOKEN=your_access_token
SHOPIFY_LOCATION_ID=your_location_id
SCOPES=read_products,write_products,read_orders,write_orders,read_customers,write_customers
MONGODB_URI=your_mongodb_uri
PORT=4000
CLIENT_URL=your_client_url
```

3. **Run the backend (NestJS):**

```bash
npm run start:dev
```

4. **Run the frontend (React):**

```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── products/
│   ├── orders/
│   ├── customers/
│   ├── inventory/
│   ├── shopify/
│   ├── webhooks/
│   └── client/ (React frontend)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## API Endpoints

- `/products` - Product management
- `/inventory` - Inventory synchronization
- `/orders` - Order processing
- `/customers` - Customer data management
- `/webhooks` - Shopify webhook handling

## Security

- All webhooks are secured using HMAC verification
- API endpoints are protected with OAuth authentication
- Sensitive data is encrypted at rest (if implemented)

## Testing

- Use `npm run test` for backend tests (Jest)
- Use the provided Postman collection or API docs for manual testing

---

**For reference/demo only. Not for production use.**
