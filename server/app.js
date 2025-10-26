import express from 'express';
import cors from 'cors';
import connectDB from './db/db.js';
import userRoutes from './routes/user.route.js';

const app = express();
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});


export default app;
