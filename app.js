const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// console.log(__dirname);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));

app.use("/getISS", require("./routes/iss"));

app.get("/", async(req, res) => {
  res.render("index.pug");
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/accessToken", (req, res) => {
  res.json({
    token: process.env.TOKEN,
  });
});

app.listen(PORT);
