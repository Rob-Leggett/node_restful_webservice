import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import config from './configuration/config.js';
import authenticateRouter from './authenticate/authenticateRouter.js';
import customerRouter from './customer/customerRouter.js';
import * as exceptionHandler from './exceptionHandler.js';
import seed from '../config/seed.js';

const PORT = process.env.PORT || 3000;

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.database);
    console.log('Connected to MongoDB');

    if (process.env.NODE_ENV === 'development') {
      await seed();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Express Application
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/authenticate', authenticateRouter);
app.use('/customer', customerRouter);

// Exception Handling
app.use(exceptionHandler.handle);

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();

export default app;