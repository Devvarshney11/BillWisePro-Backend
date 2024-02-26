require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");

// const { UserControllers } = require("./controllers/index");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/index"));
app.use("/", require("./routes/items"));
app.use("/", require("./routes/party"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
