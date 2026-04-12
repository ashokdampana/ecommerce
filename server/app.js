const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./middleware/errorMiddleware');
const protect = require('./middleware/authMiddleware.js')

const authRoutes = require('./modules/auth/auth.route.js');
const productRoutes = require('./modules/product/product.route.js');
const orderRoutes = require('./modules/order/order.route.js');

dotenv.config();
const app = express();

app.use( helmet());
app.use( cors({
    origin: process.env.FRONTEND_URL,
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

// Route not found
app.use((req, res, next) => {
  next(new Error('Route Not Found', 404));
});

app.use(errorHandler);

module.exports = app;
