const express = require("express");
const app = express();
const PORT = 3000;

app.get("/verVideo", (req, res) => {
  res.send("VerVideo");
});

app.get("/comentando", (req, res) => {
  setTimeout(() => {
    res.send("Comentando");
  }, 2000);
});

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});
