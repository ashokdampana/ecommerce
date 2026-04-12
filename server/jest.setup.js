const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// afterEach(async () => {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const name of collections) {
//     await mongoose.connection.collections[name].deleteMany({});
//   }
// });


afterAll(async () => {
  await mongoose.disconnect();
});
