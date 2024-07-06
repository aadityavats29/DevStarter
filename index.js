import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import connectDB from './connection/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

dotenv.config();
const port = process.env.PORT || 8092;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/',userRoutes);
app.use('/api/',blogRoutes);

app.use(express.static(path.resolve(__dirname,"BlogApp","dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"BlogApp","dist","index.html"));
});

const username = process.env.DB_username;
const password = process.env.DB_password;
console.log(username,password);
connectDB(username,password);

app.listen(port,()=>{
    console.log("Server is working");
})