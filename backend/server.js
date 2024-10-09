import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 5000;
connectDb();
connectCloudinary();

// Increase limit for JSON and URL-encoded data
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // Increase the size limit for JSON requests
app.use(express.urlencoded({ 
    limit: '50mb',  // Increase limit for URL-encoded requests
    parameterLimit: 100000,
    extended: false
}));

// api endpoints
app.use('/api/admin', adminRouter);
app.get('/', (req, res) => res.status(200).send('hello world'));

// start server
app.listen(port, () => console.log(`Server running on localhost:${port}`));