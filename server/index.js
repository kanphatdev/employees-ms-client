import express from 'express';
import cors from 'cors';
import adminRouter from './routes/AdminRoute.js';// Import the admin route

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT"],
    credentials:true,
}));
app.use(express.json());

// Use the routes from routes folder
app.use('/auth', adminRouter);

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
