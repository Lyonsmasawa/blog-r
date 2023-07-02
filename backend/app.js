import express from 'express' // or const express = require('express') 
import dotenv from "dotenv";
import postRouters from './routers/postRouters.js'; // or const postRouters = require('./routers/post')
import connectDB from './db/index.js';
import morgan from 'morgan';

connectDB()
dotenv.config()
const PORT = process.env.PORT;

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/post', postRouters)

app.listen(PORT, () => {
    console.log("PORT IS LISTENING ON " + PORT)
})