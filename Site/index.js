const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static("public"));
//app.use(express.static("static"));

// Load routing
require("./routes/Route")(app);

//default error handler
app.use((err, req, res, next) => {
  if (err && !res.writableEnded) {
    console.log(err);
    res?.end("Error...");
  }
});

app.listen(3000, function () {
  console.log("Server running on: 3000");
});
