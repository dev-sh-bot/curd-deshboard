require("dotenv").config();
const express = require("express");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const customerRoute = require("./routes/customer");
const errorHandler = require("./middlewares/errorHandler");
const ErrorResponse = require("./utils/errorResponse");

// Database Config
require("./config/db_conn");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => {
  res.send("API connected");
});

// Apply the customerRoute for other customer-related routes
app.use("/api/customers",upload.single('profilePicture'), customerRoute);

app.all("*", (req, res, next) => {
  next(new ErrorResponse("Route not found", 404));
});

// Error Handling Middleware
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
