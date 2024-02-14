const express = require("express")
const createDepartment = require("../controller/department.controller")
const router = express.Router()


//working in browser so used get
router.post("/",createDepartment)


module.exports = router