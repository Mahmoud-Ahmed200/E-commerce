const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting to database:", error);
    process.exit(1);
  }
};

module.exports = connect ;
