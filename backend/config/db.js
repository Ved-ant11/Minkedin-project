const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


module.exports = mongoose;
