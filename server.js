import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import studentRoutes from './src/routes/studentRoutes.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';
import logger from './src/middleware/logger.js';
import notFound from './src/middleware/notFound.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(logger);

// Swagger Documentation UI and JSON spec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root health check
 *     tags: [General]
 *     responses:
 *       200:
 *         description: API is running successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
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
  console.log(`Swagger documentation available at: http://localhost:${PORT}/api-docs`);
});
