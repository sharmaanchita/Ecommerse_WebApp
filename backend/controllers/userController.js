const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


exports.registerUser = handleAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is temporary",
            url: "lalalalla",
        },
    });

    sendToken(user,201,res);

});


exports.loginUser = handleAsyncError(async(req,res,next)=>{

    const {email,password}= req.body;


    if(!email || !password){
        return next(new ErrorHandler("Both email and password required", 400));
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

   sendToken(user,200,res);
});

// Logout 
exports.logoutUser = handleAsyncError(async(req, res, next) => {

    res.cookie("token", null, {
        expires: new Date (Date.now()),
        httpOnly: true
    })

    res.status(400).json({
        success: true,
        message: "logout complete"
    })
});


// Forgot Password
exports.forgotPassword = handleAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})
    if(!user) {
       return next( new ErrorHandler("user not found", 404))
    };

    const resetToken= user.getResetPasswordToken();

    await user.save({validateBeforesave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
    const message = `your reset passowrd url is ${resetPasswordUrl}, if this is not the requested email, kindly ignore.`

    try {
        await sendEmail({
            email: user.email,
            subject: `ecommerce website password reset`,
            message,
        });

        res.status(200).json({
            success:true,
            message: `email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforesave: false})

        return next(new ErrorHandler(error.message,500))
    }
});

// Reset Password
exports.resetPassword = handleAsyncError(async(req,res,next)=>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()},
    })
    if(!user) {
        return next( new ErrorHandler("Resst Password token is invalid or has expired", 400))
    };

    if (req.body.password !== req.body.confirmPassword){
        return next( new ErrorHandler("wrong Password", 400))
    };

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// User Details
exports.getUserDetails = handleAsyncError(async(req,res,next)=>{
    console.log('getUserDetails executed');
    const user = await User.findById(req.user.id);
    console.log('User ID:', req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});

// Update user password
exports.updatePassword = handleAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect", 400));
    };

    if (req.body.newPassword !== req.body.confirmPassword){
        return next( new ErrorHandler("Password did not match", 400))
    };

    user.password = req.body.newPassword;
    user.save();
    sendToken(user, 200, res);
});

// update User data
exports.updateUserData = handleAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // add cloudinary
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success:true,
    })

});

// Get all users--Admin
exports.getAllUsers = handleAsyncError(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
})

// Get user--Admin
exports.getUser = handleAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`No user exists with the ID ${req.params.id}`,400))
    }

    res.status(200).json({
        success: true,
        user
    });
});

// Update user Role --Admin
exports.updateUserRole = handleAsyncError(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    // add cloudinary
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!user){
        return next(new ErrorHandler(`No user exists with the ID ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
    })
});

//Delete User --Admin
exports.deleteUser = handleAsyncError(async(req,res,next)=>{
  
    const user = await User.findById(req.params.id)
    if (!user){
        return next(new ErrorHandler(`No user exists with the ID ${req.params.id}`,400))
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message: "user deleted succesfully",
    })
});

