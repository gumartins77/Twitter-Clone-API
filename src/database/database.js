const mongoose = require("mongoose");

const connectDB = () => {
  console.log("Connecting to database...");

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(`Err connect to MongoDB: ${err}`));
};

module.exports = connectDB;