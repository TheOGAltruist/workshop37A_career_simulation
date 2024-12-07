const { 
    myComments,
} = require("../controllers/comment.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")
const router = require("express").Router()
module.exports = router

router.get("/comments/me", isLoggedIn, myComments)