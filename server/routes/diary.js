const express = require("express");
const router = express.Router();
const controllers = require("../controllers/diary");

router.get("/", controllers.get);
router.post("/", controllers.post);
router.delete("/", controllers.delete);

module.exports = router;
