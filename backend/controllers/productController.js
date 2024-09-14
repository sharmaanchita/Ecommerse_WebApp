const Product= require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const ApiFeature = require("../utils/apiFeature");

// Create Product --admin
exports.createProduct = handleAsyncError (async(req,res,next)=>{
    
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

// Find all products 
exports.getAllProducts = handleAsyncError (async (req,res)=>{

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();


    const apifeature = new ApiFeature(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const product = await apifeature.query;
    res.status(200).json({
        success:true,
        product,
        productCount,
    });
});

// Get product details
exports.productDetail= handleAsyncError ( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    
    if (!product){
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(500).json({
        success:true,
        product,
        productCount
    });

});

// Update products --admin
exports.updateProduct= handleAsyncError (async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

     
    if (!product){
        return next(new ErrorHandler("product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        useFindAndModify: false,
        runValidators: true
    });

    res.status(200).json({
        success:true,
        product
    });
});

// Delete product
exports.deleteProduct = handleAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler("product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });

});

//Create new Review or Update review
exports.productReview = handleAsyncError(async(req,res,next)=>{
    const {rating, comment, productId} = req.body
    //Gives review with 2 user id due to change in model
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id)

    if(isReviewed){
        product.reviews.forEach((rev)=>{
        if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment);
        })
    }
    else{
        product.reviews.push(review)
        product.numberOfReviews = product.reviews.length
    }
    let avg=0;
    product.reviews.forEach((rev) =>{
        avg += rev.rating;
    })    
    product.ratings =avg /product.reviews.length
    await product.save({validateBeforeSave: false})
    res.status(200).json({
        success: true,
        message: "Product review updated successfully"
    })
});

//Get All product reviews
exports.getAllReviews = handleAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
});

//Delete product reviews
exports.deleteReview = handleAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId)

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews = product.reviews.filter( rev=> rev._id.toString() !== req.query.id.toString())

    let avg=0;
    reviews.forEach((rev) =>{
        avg += rev.rating;
    });  
    const ratings =avg /reviews.length
    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {reviews,ratings,numberOfReviews},
        {new:true, runValidators: true, useFindAndModify: false,}
    );

    res.status(200).json({
        success: true,
        message:"Review Deleted",
    })
});