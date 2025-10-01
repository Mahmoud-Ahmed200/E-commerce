const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://mahmoud2582005:2582005@e-commerce.stymjhq.mongodb.net/";
const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting to database:", error);
  }
};
module.exports = { connect };
