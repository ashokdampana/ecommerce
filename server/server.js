
const app = require('./app');
const connectDB = require('./config/db');
const redisClient = require('./config/redisClient.js');

const PORT = process.env.PORT || 5000;


async function start() {
  await connectDB();
  
  if (!redisClient.isOpen) {
    await redisClient.connect(); 
  }

  app.listen(PORT, () => {
    console.log(`=> Server running on port http://localhost:${PORT}`) 
  });
}

start();
