const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  express.json({
    extended: false,
  })
);

const connectDb = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"));
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connectDb();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));

app.listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
