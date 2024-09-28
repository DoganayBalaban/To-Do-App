const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use(
  express.json({
    extended: false,
  })
);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

app.use(cookieParser());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/notes", require("./routes/notes"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDb();
});
