const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please give the product name"],
        trim: true,
    },
    description:{
        type: String,
        required: [true, "Please give the product description"],
    },
    price:{
        type: Number,
        required: [true, "Please give the product price"],
        maxLength:[8,"price cannot be more than 8 digits"],
    },
    ratings:{
        type: Number,
        default:0,
    },
    image:[
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            }
        }
    ],
    stock:{
        type: Number,
        required: [true, "Please give the products in stock"],
        maxLength:[4, "stock cannot be more than 4 digits"],
        default:1,
    },
    category:{
        type: String,
        required: [true, "Please give the product category"],
    },
    numberOfReviews:{
        type: Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required: true,
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

module.exports= mongoose.model("Product", productSchema);

