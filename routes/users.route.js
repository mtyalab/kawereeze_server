const express = require('express');
const {
  signUpController,
  resetPasswordRequestController,
  resetPasswordController, loginController
} = require("../controllers/auth.controller");

const router = express.Router();

/* GET users listing. */
router.post("/auth/login", loginController);
router.post("/auth/signup", signUpController);
router.post("/auth/request-reset-password", resetPasswordRequestController);
router.post("/auth/reset-password", resetPasswordController);

module.exports = router;
