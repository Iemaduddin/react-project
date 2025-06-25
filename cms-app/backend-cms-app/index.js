const express = require("express");
const app = express();
const port = 3000;

const name = "Didin";
const listNames = [
  {
    name: "Didin",
    address: "Laok Songai",
  },
  {
    name: "Didin 1",
    address: "Laok Songai 1",
  },
  {
    name: "Didin 2",
    address: "Laok Songai 2",
  },
];
app.get("/", (req, res) => {
  res.send(listNames);
});

app.listen(port, () => {
  console.log("App Running on port" + { port });
});
