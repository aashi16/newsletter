const express = require("express");
const app = express();
const port = 8080;
app.use(express.static("public"));
app.use(express.json());

app.post("/", (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).send({ status: "NOT OK" });
  }
  res.status(200).send({ status: "OK" });
});

app.listen(port);
