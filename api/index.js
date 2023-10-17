import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { env } from 'process';

dotenv.config();

mongoose.connect(process.env.URL)
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.log(e));


const app = express();
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);