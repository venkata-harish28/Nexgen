import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import tenantRoutes from './routes/tenant.js';
import ownerRoutes from './routes/owner.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tenant', tenantRoutes);
app.use('/api/owner', ownerRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Hostel Management System API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});