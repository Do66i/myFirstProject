const express = require("express");
const router = express.Router();
const patchControllers = require("../controllers/myPage/index");
const tripControllers = require("../controllers/myPage/trip");

//비밀번호 변경
router.patch("/", patchControllers.patch);

//여행정보 다 가져오기
router.get("/trip", tripControllers.get);

//여행정보 입력하기
router.post("/trip", tripControllers.post);

router.delete("/trip", tripControllers.delete);

module.exports = router;
