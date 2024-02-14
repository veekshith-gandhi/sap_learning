const express = require("express")
const passport = require('passport');
const {createEmploye,registerEmploye} = require("../controller/employee.controller")
const router = express.Router()
require("../config/passport")(passport)

router.post("/create",createEmploye)
router.post("/register",registerEmploye)

module.exports = router