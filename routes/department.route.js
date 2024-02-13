const express = require("express")
const createDepartment = require("../controller/department.controller")
const router = express.Router()


//working in browser so used get
router.get("/",createDepartment)


module.exports = router