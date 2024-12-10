import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import connectDB from './connection/connection.js';
import { Stripe } from 'stripe';

dotenv.config();

const app = express();
const port = process.env.PORT || 8092;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

// CORS Configuration
const allowedOrigins = [
    'https://dev-starter-frontend.vercel.app',
    'http://localhost:5173',
];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Log all requests
app.use((req, res, next) => {
    console.log(`Received Request - Method: ${req.method}, Path: ${req.path}`);
    next();
});

// Body Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).send('Invalid amount');
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Donation' },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Connect to Database
connectDB().catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
