import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.routes.js'

dotenv.config();

mongoose.connect(process.env.URL)
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.log(e));


const app = express();
const PORT = 3001;


app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);