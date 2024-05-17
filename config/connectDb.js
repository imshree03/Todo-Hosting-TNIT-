const mongoose = require("mongoose");
require("dotenv").config();

exports.DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB is connected successfully");
  } catch (error) {
    console.log("Error while connecting to db", error);
  }
};
