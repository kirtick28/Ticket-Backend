import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Ticket Backend Running'
  });
});

export default app;
