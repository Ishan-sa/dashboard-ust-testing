const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apiPort = 8888;
const mongoose = require("mongoose");
const routes = require("./routes/sites");

// import Schedule from "./models";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/sites", routes);

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
