const { 
    getAllItems,
    getSingleItem,
    getItemReviews,
    getItemSingleReview,
    postItemReview,
    postItemReviewComment,
} = require("../controllers/items.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")
const router = require("express").Router()
module.exports = router

router.get("/items", getAllItems)
router.get("/items/:itemId", getSingleItem)
router.get("/items/:itemId/reviews", getItemReviews)
router.get("/items/:itemId/reviews/:reviewId", getItemSingleReview)
router.post("/items/:itemId/reviews", isLoggedIn, postItemReview)
router.post("/items/:itemId/reviews/:reviewId/comments", isLoggedIn, postItemReviewComment)