# Shopify App Starter

This app is a simple Shopify app foundation for the store:

- Admin URL: <https://admin.shopify.com/store/wbk2sk-ii>
- Expected store domain: wbk2sk-ii.myshopify.com

## Quick start

1. Copy `.env.example` to `.env`.
2. Add the values from your Shopify Partner app.
3. Install dependencies when Node is available:

```bash
npm install
npm run dev
```

1. Open <http://localhost:3000> to confirm the project boots.

## Required Shopify credentials

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=http://localhost:3000
SHOPIFY_SCOPES=read_products,write_products
SHOPIFY_STORE_DOMAIN=wbk2sk-ii.myshopify.com
SHOPIFY_REDIRECT_URI=http://localhost:3000/auth/callback
PORT=3000
```

## Partner Dashboard configuration

In the Shopify app configuration screen, set:

- App URL: <http://localhost:3000>
- Allowed redirection URLs:
  - <http://localhost:3000/auth/callback>
  - <https://your-public-domain.com/auth/callback>

## Included routes

- `/` — app status and config summary
- `/health` — health check
- `/auth` — begins the OAuth flow
- `/auth/callback` — receives the OAuth callback
- `/products` — placeholder endpoint for product queries

## Important note

The project is scaffolded and ready for the real OAuth flow, but it still requires a valid Shopify app API key and secret from Partner Dashboard before it can complete installation on the store.
