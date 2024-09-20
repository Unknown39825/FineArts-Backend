require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('passport');

// my routes
const userRoutes = require("./routes/Users/user");
const homecardRoutes = require("./routes/HomePage/homecard");
const eventRoutes = require("./routes/HomePage/event");
const WorkshopRoutes = require("./routes/HomePage/workshop");
const contributorRoutes = require("./routes/HomePage/contributor");
const artworkRoutes = require("./routes/ArtGallery/artwork");
const formRoutes = require("./routes/Form/form");

//DB Connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB CONNECTED");
  });

const app = express();
app.use(cors());

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

app.use(passport.initialize());

//My Routes
app.use("/user", userRoutes);
app.use("/api", contributorRoutes);
app.use("/api", homecardRoutes);
app.use("/api", eventRoutes);
app.use("/api", WorkshopRoutes);
app.use("/api", artworkRoutes);
app.use("/api", formRoutes);

// app.use("/",(req,res)=>{
//   res.send("Welcome to FineArts");
// })

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  const path = require('path');
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'));
  })
}

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});