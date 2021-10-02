const express = require("express");
const app = express();
const port = 3001;
const mongo = require("./mongo");
const studentRoutes = require("./routes/students.routes");
const mentorsRoutes = require("./routes/mentors.routes");
const cors = require("cors");

async function loadApp() {
  try {
    //mongodb connect
    await mongo.connect();

    //middlewares
    app.use(express.json()); //it is needed to handle request /id
    //allowing same origin cors
    app.use(cors());

    //routes
    app.use("/students", studentRoutes);
    app.use("/mentors", mentorsRoutes);

    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}
loadApp();
