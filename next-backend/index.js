import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import soilRouter from './routes/soilRoutes.js';
import distributorRouter  from "./routes/distributorRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/soil', soilRouter)
app.use('/api/distributor', distributorRouter)

// Default route
app.get('/', (req, res) => {
  res.send("server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});