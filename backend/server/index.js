const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 8888;
const mongoose = require("mongoose");
const siteRoute = require("./routes/sites");
const tmoMainRoute = require("./routes/tmo-main");
const poRoute = require("./routes/po-lookups");

// import Schedule from "./models";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/sites", siteRoute);
app.use("/tmo-main", tmoMainRoute);
app.use("/po-lookups", poRoute);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

mongoose
  .connect("mongodb://localhost:27017/dashboard-ust", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
