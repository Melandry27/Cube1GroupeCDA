import mongoose from "mongoose";

const TEST_DB_NAME = "testdb";
const TEST_DB_URI = `mongodb://127.0.0.1:27017/${TEST_DB_NAME}`;

export const connectToTestDb = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_DB_URI);
    console.log("✅ Connected to test database:", mongoose.connection.name);
  }
};

export const disconnectFromTestDb = async () => {
  const dbName = mongoose.connection.name;

  if (dbName === TEST_DB_NAME) {
    console.log("⚠️ Dropping test database:", dbName);
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    } else {
      console.warn("❌ Cannot drop database: 'mongoose.connection.db' is undefined.");
    }
  } else {
    console.warn(`❌ Skipping dropDatabase(): not connected to "${TEST_DB_NAME}", but to "${dbName}"`);
  }

  await mongoose.disconnect();
};
