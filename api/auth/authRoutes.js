const express = require("express");
const { login, signup, logout, loginWithGoogle } = require("./authController");

const router = express.Router();

router.post("/loginWithGoogle", loginWithGoogle);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
