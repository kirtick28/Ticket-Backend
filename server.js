import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION 💥');
  console.error(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Catch async promise errors
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION 💥');
  console.error(err.name, err.message);

  // Graceful shutdown
  server.close(() => {
    process.exit(1);
  });
});
