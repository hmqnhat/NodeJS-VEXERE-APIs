const express = require("express");
const mongoose = require("mongoose");

const stationController = require("./controllers/station.controller");
const tripController = require("./controllers/trip.controller");
const userController = require("./controllers/user.contronller");
const ticketController = require("./controllers/ticket.controller");

mongoose
  .connect("mongodb://localhost:27017/class-vexere", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to Database successfully"))
  .catch(console.log);

const app = express();

app.use(express.json());

app.use("/api", stationController);
app.use("/api", tripController);
app.use("/api", userController);
app.use("/images", express.static("images"));
app.use("/api", ticketController);

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
