import express  from "express";
import connectDB from './config/database.js';

const app = express();
const port = 9000;
connectDB();

app.use("/",(req,res)=>{
    res.json({message:"Hellow From Hackthon"})
})

app.listen(9000,()=>{
    console.log(`Starting Server on port ${port}`);
    
})