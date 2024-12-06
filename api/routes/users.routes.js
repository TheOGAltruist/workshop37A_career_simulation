const { 
    allUsers
} = require("../controllers/users.controller.js")

const router = require("express").Router()
module.exports = router

router.get("/users",allUsers)