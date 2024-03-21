import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();


connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json()); //helps in parsing raw json
app.use(express.urlencoded({extended: true})) // this allows to send form data
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on: ${port}`);
});