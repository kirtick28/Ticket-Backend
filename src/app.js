import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

import globalErrorHandler from './middlewares/error.middleware.js';

const app = express();

/* SECURITY HEADERS */
app.use(helmet());

/* CORS CONFIG  */
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

/* DEV LOGGING  */
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

/* BODY PARSER  */
app.use(express.json({ limit: '10kb' }));

/* DATA SANITIZATION  */
app.use(mongoSanitize());
app.use(xss());

/* GLOBAL RATE LIMITER  */
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, try again later.'
});
app.use(limiter);

/* HEALTH CHECK ROUTE  */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Ticket Backend Running'
  });
});

/* GLOBAL ERROR HANDLER  */
app.use(globalErrorHandler);

export default app;
