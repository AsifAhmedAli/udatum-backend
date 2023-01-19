const router = require("./routes/routes");
const express = require("express");
// const conn = require("./conn/conn");
// require("dotenv").config();
const app = express();
app.use(express.json());
const port = 3000;

// app.use(conn);
app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
