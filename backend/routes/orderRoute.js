const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();
const { newOrder, getSingleOrder, getAllOrder, getUserOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController.js")

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, getUserOrders);

//Admin routes NOT WORKING

router.route("admin/orders").get(isAuthenticatedUser, authorizedRoles("admin"),getAllOrder);

router.route("admin/order/:id").put(isAuthenticatedUser, authorizedRoles("admin"),updateOrderStatus)
.delete(isAuthenticatedUser, authorizedRoles("admin"),deleteOrder);

module.exports = router;


