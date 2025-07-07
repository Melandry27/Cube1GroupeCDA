import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://admin:admin@mongo/cube1groupecda?authSource=admin";
// process.env.NODE_ENV === "test"
//   ? process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/testdb"
//   : process.env.MONGO_URI || "mongodb://127.0.0.1:27017/prod";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log(`MongoDB connectée à ${mongoose.connection.name} !`);
    }
  } catch (err) {
    console.error("Erreur MongoDB :", err);
    process.exit(1);
  }
};

export default connectDB;
