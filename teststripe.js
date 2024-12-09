import { Stripe } from 'stripe';

const stripe = new Stripe('sk_test_51QU5IFKSY4fJwSPCWUuOTiJtAmHaW2yHow39jp5xvAmD9xGyLIW7NLqnrsUfPKV3BmB7s0qn7Esd3yna1SOUTLxh00PqS6fubZ', { apiVersion: '2023-08-16' });

const runTest = async () => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log('Payment Intent Created:', paymentIntent);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

runTest();
