const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const handleAsyncError = require("../middleware/handleAsyncError")

// New Order
exports.newOrder = handleAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }  = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success:true,
        order
    })
});

//Get Single Order
exports.getSingleOrder = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(!order){return next(new ErrorHandler("order does not exist", 404))}

    res.status(200).json({
        success:true,
        order,
    })
});

// Get logged in orders
exports.getUserOrders = handleAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id})
   // if(!order){return (new ErrorHandler("order does not exist", 404))} - What if no orders

    res.status(200).json({
        success:true,
        orders
    })
});

//Get All Orders -- Admin
exports.getAllOrder = handleAsyncError(async(req,res,next)=>{
    const orders = await Order.find()
    
    let totalAmount = 0;

    orders.forEach((order)=> totalAmount += order.totalPrice);

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
});

// Update order status -- Admin
exports.updateOrderStatus = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){return next(new ErrorHandler("order does not exist with this id", 404))}
    if(order.orderStatus === "Delivered"){return next(new ErrorHandler("This order is already delivered", 404))}
    if(req.body.status === "Shipped")
        {order.orderItems.forEach(async (o)=>{await updateStock(o.product, o.quantity)} )}

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered")
        {order.deliveredAt= Date.now()}
    
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })

    async function updateStock(id,quantity){
        const product = await Product.findById(id)
        product.stock -= quantity;
        await product.save({validateBeforeSave:false})
    }
});

//Delete order --Admin
exports.deleteOrder = handleAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){return next(new ErrorHandler("order does not exist", 404))}

    await order.deleteOne();

    res.status(200).json({
        success:true,
    })
});





