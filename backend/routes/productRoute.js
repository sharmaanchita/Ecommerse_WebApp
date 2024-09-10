const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetail, productReview, getAllReviews, deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router.route("/products/:id").get(productDetail);

router.route("/admin/products/:id").put(isAuthenticatedUser, authorizedRoles("admin"),  updateProduct).delete(isAuthenticatedUser, authorizedRoles("admin"),  deleteProduct);

router.route("/reviews").put(isAuthenticatedUser, productReview).get(getAllReviews).delete(isAuthenticatedUser,deleteReview);

module.exports= router;