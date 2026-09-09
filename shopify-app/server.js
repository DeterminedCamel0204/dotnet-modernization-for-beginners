require('dotenv').config();
const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);
const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || 'wbk2sk-ii.myshopify.com';
const appUrl = process.env.SHOPIFY_APP_URL || 'http://localhost:3000';
const scopes = (process.env.SHOPIFY_SCOPES || 'read_products,write_products').split(',').filter(Boolean);

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'Shopify app starter is running',
        app: {
            name: 'Shopify app starter',
            storeDomain,
            appUrl,
            scopes,
            hasApiKey: Boolean(process.env.SHOPIFY_API_KEY),
            hasApiSecret: Boolean(process.env.SHOPIFY_API_SECRET)
        },
        routes: {
            health: '/health',
            auth: '/auth',
            callback: '/auth/callback',
            products: '/products'
        },
        nextSteps: [
            'Create the app in Shopify Partner Dashboard',
            'Add the app URL and allowed redirect URLs',
            'Set the API key and secret in the .env file',
            'Install the app on the store and complete OAuth'
        ]
    });
});

app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'shopify-app-starter' });
});

app.get('/auth', (req, res) => {
    const apiKey = process.env.SHOPIFY_API_KEY;
    const redirectUri = `${appUrl}/auth/callback`;

    if (!apiKey) {
        return res.status(500).json({
            error: 'Missing SHOPIFY_API_KEY',
            message: 'Add your Shopify app API key to the .env file before starting OAuth.'
        });
    }

    const authUrl = new URL(`https://${storeDomain}/admin/oauth/authorize`);
    authUrl.searchParams.set('client_id', apiKey);
    authUrl.searchParams.set('scope', scopes.join(','));
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('state', 'shopify-app-starter');
    authUrl.searchParams.set('grant_options[]', 'per-user');

    res.redirect(authUrl.toString());
});

app.get('/auth/callback', (req, res) => {
    const { code, hmac, shop, state, timestamp } = req.query;

    if (!code || !shop) {
        return res.status(400).json({
            error: 'Incomplete OAuth callback',
            received: { code, hmac, shop, state, timestamp }
        });
    }

    res.json({
        status: 'OAuth callback received',
        shop,
        state,
        timestamp,
        note: 'Complete the access token exchange and session setup in the next phase of the Shopify app implementation.'
    });
});

app.get('/products', (req, res) => {
    res.json({
        status: 'Product endpoint ready',
        message: 'This route is ready for Shopify Admin API calls once your app is installed and a token is available.',
        storeDomain,
        scopes
    });
});

app.listen(port, () => {
    console.log(`[shopify-app] listening on http://localhost:${port}`);
    console.log(`[shopify-app] store: ${storeDomain}`);
    console.log(`[shopify-app] auth URL: ${appUrl}/auth`);
});
