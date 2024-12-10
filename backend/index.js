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
dotenv.config();

const port = process.env.PORT || 8092;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', userRoutes);
app.use('/api/', blogRoutes);

app.use(express.static(path.resolve(__dirname, 'BlogApp', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'BlogApp', 'dist', 'index.html'));
});

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


connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
