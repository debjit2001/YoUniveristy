const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connecting to mongoDb
connectDB();

const PORT = process.env.PORT || 5000;
//middleware
app.use(express.json());

app.get("/", (req, res) => {
  //   console.log("req:>>", req);
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
