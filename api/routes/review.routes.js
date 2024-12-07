const { 
    myReviews,
} = require("../controllers/review.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")
const router = require("express").Router()
module.exports = router

router.get("/reviews/me", isLoggedIn, myReviews)