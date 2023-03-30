const express = require("express");
const path = require("path");
const app = express();
const music = require("./music.json");
const router = express.Router();

app.use(express.static("public"));

app.use("/css", express.static(path.join(__dirname + "/public/css")));
app.use("/script", express.static(path.join(__dirname + "/public/script")));
app.use("/imgs", express.static(path.join(__dirname + "/public/imgs")));
app.use("/music", express.static(path.join(__dirname + "/public/music")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/page/index.html"));
});

router.get("/api", (req, res) => {
  return res.json(music);
});

app.listen(process.env.PORT || 3000);

app.use(router);