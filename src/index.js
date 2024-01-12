const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "https://knockie-sites-now.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and HTTP authentication
  optionsSuccessStatus: 204, // No Content response for preflight requests
};
require("./utils/db.js");
//
const requestsRoutes = require("./routes/requests.js");
const websitesRoutes = require("./routes/websites.js");

//initailizing the app
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "1000mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(cookieParser());

app.use("/requests", requestsRoutes);
app.use("/websites", websitesRoutes);

app.listen(process.env.PORT, () => {
  console.log("this ran app running on port" + " " + process.env.PORT);
  MongoClient.connect(process.env.MONGO_URI, (error, client) => {
    if (error) {
      console.log(error);
    }
    console.log("this ran app running on port" + " " + process.env.PORT);
  });

  console.log("app running on port" + " " + process.env.PORT);
});
