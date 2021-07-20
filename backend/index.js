const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//morgan config
const morgan = require("morgan");
app.use(morgan("dev"));

//connecting to mongoDb
connectDB();

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); //for making the upload folder static(publicly accessible)

//Importing Routes
const eventRoute = require("./routes/EventRoutes");
const lostRoute = require("./routes/LostRoutes");
const foundRoute = require("./routes/FoundRoutes");
const canteenRoute = require("./routes/CanteenRoutes");
///Route middleWare
app.use("/event", eventRoute);
app.use("/lost", lostRoute);
app.use("/found", foundRoute);
app.use("/canteen", canteenRoute);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
