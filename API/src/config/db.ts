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
      console.log(`Tentative de connexion à MongoDB : ${MONGO_URI}`);

      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // 30 secondes
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      });

      console.log(`MongoDB connectée à ${mongoose.connection.name} !`);
    }
  } catch (err) {
    console.error("Erreur MongoDB :", err);
    console.error("URI utilisée :", MONGO_URI);

    // Retry logic
    console.log("Nouvelle tentative dans 5 secondes...");
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

export default connectDB;
