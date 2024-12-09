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

const app = express();

// Load environment variables
dotenv.config();

// Get port from environment variables or fallback to 8092
const port = process.env.PORT || 8092;

// Resolve file paths for static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/', userRoutes);
app.use('/api/', blogRoutes);

// Serve static assets for frontend
app.use(express.static(path.resolve(__dirname, 'BlogApp', 'dist')));

// Catch-all route to serve index.html for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'BlogApp', 'dist', 'index.html'));
});

// Stripe Checkout session route
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Donation', // Product name for the donation
                        },
                        unit_amount: 5000, // Amount in cents (e.g., $50.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success`, // Replace with your success URL
            cancel_url: `${process.env.BASE_URL}/cancel`, // Replace with your cancel URL
        });

        // Send session id back to client
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
    