const express = require("express");
const {isAuthenticatedUser,authorizedRoles} = require("../middleware/auth");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserData, getAllUsers, getUser, updateUserRole, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

//not working
router.route("/me").get(isAuthenticatedUser , getUserDetails);

router.route("/password/update").put(isAuthenticatedUser , updatePassword);

router.route("/me/update").put(isAuthenticatedUser , updateUserData);

router.route("/admin/users").get(isAuthenticatedUser , authorizedRoles("admin"), getAllUsers);

router.route("/admin/user/:id").get(isAuthenticatedUser , authorizedRoles("admin"), getUser)
.put(isAuthenticatedUser , authorizedRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser , authorizedRoles("admin"), deleteUser);

module.exports = router;