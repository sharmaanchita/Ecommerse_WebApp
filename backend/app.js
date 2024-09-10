const express = require("express");
const cookieParser = require("cookie-parser");
const products = require("./routes/productRoute");
const users = require("./routes/userRoute");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Import routes
app.use("/api/v1",products);
app.use("/api/v1",users);


// Middleware 
app.use(errorMiddleware);

module.exports=app;