

// Import the required modules
const express = require("express")
const router = express.Router();

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth");

// routes for login, signup , sendOtp and changePassword

// // routes for user login
router.post("/login",login);
// // // route for user singup 
router.post("/signUp",signUp);
// // // route for sending otp to user's email
router.post("/sendOTP",sendOTP);
// // route for changing password when we are already login
router.post("/changePassword",auth,changePassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Export the router for use in the main application
module.exports = router;