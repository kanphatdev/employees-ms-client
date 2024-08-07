import express from 'express';
import cors from 'cors';
import adminRouter from './routes/AdminRoute.js';// Import the admin route

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT" , "DELETE"],
    credentials:true,
}));
app.use(express.json());

// Use the routes from routes folder
app.use('/auth', adminRouter);

// add static for the image
// app.use(express.static('Public'));


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
