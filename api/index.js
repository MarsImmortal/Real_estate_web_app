import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

dotenv.config();

mongoose.connect(process.env.URL)
    .then(() => console.log('MongoDB connected'))
    .catch((e) => console.log(e));


const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    }
);