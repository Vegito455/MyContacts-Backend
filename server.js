const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();

// middleware start
app.use(express.json());
// middleware end

// create MongoDB connection
connectDb();

// Testing API - Check server is running properly or not - start
app.get("/welcome", (req, res) => {
  res.status(200).json({ status: 1, message: "Welcome to Node.js Project" });
});
// Testing API - Check server is running properly or not - end

// Map router file API - start
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Map router file API - end
app.use(errorHandler);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
