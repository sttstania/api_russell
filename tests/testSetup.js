// tests/testSetup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Connect to in-memory MongoDB before running tests
 */
const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB in-memory connected ✅");
};

/**
 * Clear all collections
 */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

/**
 * Close connection and stop server after tests
 */
const closeDatabase = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = {
  connect,
  closeDatabase,
  clearDatabase,
};
