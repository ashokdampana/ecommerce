const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middleware/errorMiddleware');
const protect = require('./middleware/authMiddleware.js')

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use( helmet());
app.use( cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(morgan('dev'));


app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({message: "server home page"})
})

app.use('/api/auth', authRoutes);
app.use('/api/products', protect, productRoutes);
app.use('/api/orders', orderRoutes);

// page not found
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); 
});

app.use(errorHandler);

module.exports = app;
