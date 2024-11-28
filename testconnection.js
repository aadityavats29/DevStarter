import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // 10 seconds
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

connectDB();
