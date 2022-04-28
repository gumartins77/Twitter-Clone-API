require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/database");
const userRoute = require("./users/users.route");
const authRoute = require("./auth/auth.route");

const port = process.env.PORT || 3005;
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
