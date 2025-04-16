# Pyramid CRM & Shopify Integration

This application provides integration between Pyramid CRM and Shopify, enabling bidirectional data synchronization for products, inventory, orders, and customer data.

## Features

- Product Management
- Inventory Synchronization
- Order Processing
- Fulfillment Management
- Customer Data Synchronization
- Webhook Handling

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Configure environment variables:
   Create a `.env` file with the following variables:

```
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_SHOP_URL=your_shop_url
MONGODB_URI=your_mongodb_uri
```

3. Run the application:

```bash
python app.py
```

## Project Structure

```
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── webhooks/
├── tests/
├── requirements.txt
└── README.md
```

## API Documentation

The application provides the following main endpoints:

- `/api/products` - Product management
- `/api/inventory` - Inventory synchronization
- `/api/orders` - Order processing
- `/api/customers` - Customer data management
- `/webhooks` - Shopify webhook handling

## Security

- All webhooks are secured using HMAC verification
- API endpoints are protected with OAuth authentication
- Sensitive data is encrypted at rest

## Testing

Run tests using:

```bash
pytest
```
# pyramid-crm-shopify
# pyramid-crm-shopify
# pyramid-crm-shopify
