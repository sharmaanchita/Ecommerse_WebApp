const app = require("./app");
const dotenv= require("dotenv");
const connectDatabase = require("./config/database");

// Uncaught Error
process.on("uncaughtException", (err)=>{
    console.log(`Error is: ${err.message}`)
    console.log("server is shutting down due to uncaught exception")

    process.exit(1);
});

// config
dotenv.config({path: "backend/config/config.env"});

// connect to database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`port is:${process.env.PORT}`)
});

// Unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error is${err.message}`)
    console.log("server is shutting down due to Unhandled promise rejection")

    server.close(() => {
        process.exit(1);
    });
});