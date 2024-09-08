import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connectDB.js";
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

const app  = express();
dotenv.config();



//middlwares
app.use(cors()); // to parse requests from the frontend
app.use(express.json()); // to parse responses from the frontend
app.use(cookieParser()); // to parse cookies from the frontend


app.use('/api/auth',authRoute);
app.use('/api/book',userRoute);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
  connectDB();
  console.log(`server is running on port ${PORT}`)
})