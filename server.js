import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import { connectDB } from './config/db.js';
dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the Social Network API');
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));
