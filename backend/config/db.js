const mongoose = require("mongoose");

const db = require("./default").MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB connected");
  } catch (err) {
    console.log("err:>>", err);
    process.exit(1);
  }
};

module.exports = connectDB;
