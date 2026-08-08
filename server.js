import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import studentRoutes from './src/routes/studentRoutes.js';
import logger from './src/middleware/logger.js';
import notFound from './src/middleware/notFound.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management API is running',
  });
});

app.use('/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
