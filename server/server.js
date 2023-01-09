require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error.middleware');

const userRouter = require('./routes/users.routes');

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/users', userRouter);

app.use(errorHandler); // Overrides the default behaviour of express error handler

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}...`));
};

startServer();
