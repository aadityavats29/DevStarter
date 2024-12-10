import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Connecting to database at URI:", process.env.DB_URL);

        console.log('Database connected successfully!');
        
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDB;