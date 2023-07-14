require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
const authRouter = require("./routes/authRoute");
const connectDb = require("./db/db");
const Port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
connectDb();
app.use(cors());
app.use("/api/v1", authRouter);
app.use("/api/v1", router);
app.listen(Port, () => {
  console.log("You are on Port ", Port);
});
