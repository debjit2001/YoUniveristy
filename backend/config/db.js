const mongoose = require("mongoose");
const dotenv = require("dotenv");

//invoking dotenv
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
