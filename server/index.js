import express from "express";
import bodyParser  from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import userRouter from './route/user.js'
import serviceRoute from './route/service.js'
import categoryRoute from './route/category.js'

const app = express();

dotenv.config();

app.use(bodyParser.json({limit:'30mb', extended : true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended : true}));
app.use(cors());


app.use('/users', userRouter)
app.use('/services', serviceRoute)
app.use('/category', categoryRoute)

const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.CONNECTION_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    })
    .catch(err=>{
        console.log(err.message)
    })