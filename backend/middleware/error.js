const ErrorHandler = require("../utils/errorHandler");


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Mongodb wrong id
    if(err.name==="CastError"){
        const message = `Resource not found. ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose Duplicate key error
    if(err.code=== 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)}entered`;
        err = new ErrorHandler(message, 400);
    }

    //JsonWebTokenError
    if(err.name==="JsonWebTokenError"){
        const message = `Wrong json Token, try again`;
        err = new ErrorHandler(message, 400);
    }

    // TokenExpiredError
    if(err.name==="TokenExpiredError"){
        const message = `Json Token Expired, try again`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success:false,
        message: err.message
    });

}