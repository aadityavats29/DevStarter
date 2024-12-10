import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import connectDB from './connection/connection.js';
import nodemailer from 'nodemailer';
import { Stripe } from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 8092;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

// Allowed origins for CORS
const allowedOrigins = [
    'https://dev-starter-frontend.vercel.app', // Production frontend
    'http://localhost:5173', // Local development frontend
];

// CORS Middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;
    console.log('CORS Middleware triggered');
    console.log('Origin:', origin);

    if (!origin || allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
        console.error(`Blocked by CORS: Origin ${origin}`);
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// Middleware to log request details
app.use((req, res, next) => {
    console.log('Request Details:');
    console.log(`  Origin: ${req.headers.origin}`);
    console.log(`  Method: ${req.method}`);
    console.log(`  Path: ${req.path}`);
    console.log('  Headers:', req.headers);

    res.on('finish', () => {
        console.log(`Response Status: ${res.statusCode}`);
    });

    next();
});

// Body Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/', userRoutes);
app.use('/api/', blogRoutes);

// Serve static files for frontend
app.use(express.static(path.resolve(__dirname, 'BlogApp', 'dist')));

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'BlogApp', 'dist', 'index.html'));
});

// Stripe Checkout Session Endpoint
app.post('/create-checkout-session', async (req, res) => {
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
                        product_data: {
                            name: 'Donation',
                        },
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

// Database Connection
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
