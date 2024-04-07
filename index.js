import express from "express";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/DBconnection.js";
import UserRouters from './routes/user.routes.js'
import cors  from 'cors';

import { config } from "dotenv";
config();
const app = express();
app.use(express.json()); // Parse incoming requests data
app.use(cookieParser())
app.use(cors())

app.use('/api/user',UserRouters)


app.all('*',(req,res)=>{
    res.status(400).send({messange:"page not found !"})
})

app.listen(process.env.PORT || 5000 , async()=>{
    await connectToDatabase(process.env.DATABASE_URL);
    console.log(`running on http://localhost:${process.env.PORT}`)    

})