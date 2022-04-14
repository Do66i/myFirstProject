const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user/");

router.post("/signin", controllers.signin.post);

router.post("/signout", controllers.signout.post);

router.post("/signup", controllers.signup.post);

router.delete("/withdrawal", controllers.withdrawal.delete);

module.exports = router;
