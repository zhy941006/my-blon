const express = require("express")
const router = express.Router()
const moment = require("moment")

const ctrll = require("../controller/user.js")

router.get("/register", ctrll.showOneGet)

router.get("/login", ctrll.showTwoGet)

router.post("/register", ctrll.ShowOnePost)

router.post("/login",ctrll.ShowTwoPost)

module.exports = router