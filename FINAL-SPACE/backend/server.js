import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import authRoutes from './routes/AuthRoutes.js'
import VisitedRoutes from './routes/VisitedRoute.js'
import cors from "cors"
dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api/',VisitedRoutes);
app.get('/',(req,res)=>{
    res.send('hello spaceX');
})

app.listen(PORT,(req,res)=>{
    console.log("server listening on",PORT);
    connectDB();
})