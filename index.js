const express = require("express");
const { DB } = require("./config/connectDb");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/todos", todosRoutes);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

DB();
app.listen(port, () => {
  console.log(`Server is up & running ${port}`);
});
