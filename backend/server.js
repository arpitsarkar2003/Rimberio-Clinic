import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 5000;
connectDb();
connectCloudinary()

//middleware
app.use(cors());
app.use(express.json());


// api endpoints
app.use('/api/admin', adminRouter);
app.get('/', (req, res) => res.status(200).send('hello world'));



app.listen(port, () => console.log(`server running on localhost:${port}`));