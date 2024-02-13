const express = require("express")
const createEmploye = require("../controller/employee.controller")
const router = express.Router()


//working in browser so used get
router.get("/",createEmploye)


module.exports = router