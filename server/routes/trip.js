const express = require("express");
const router = express.Router();
const diaryControllers = require("../controllers/diary");
const accountControllers = require("../controllers/account");

router.get("/:trip_id/diary", diaryControllers.get);
router.post("/:trip_id/diary", diaryControllers.post);
router.delete("/:trip_id/diary/:diary_id", diaryControllers.delete);

router.get("/:trip_id/account", accountControllers.get);
router.post("/:trip_id/account", accountControllers.post);
router.delete("/:trip_id/account/:account_id", accountControllers.delete);
module.exports = router;
