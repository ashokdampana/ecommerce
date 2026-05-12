
const app = require('./app');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await redisClient.connect();
  
  app.listen(PORT, () => {
    console.log(`=> Server running on port http://localhost:${PORT}`) 
  });
}

start();
