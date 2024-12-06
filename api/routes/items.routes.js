const { 
    getAllItems,
    getSingleItem,
    getItemReviews,
    getItemReview,
} = require("../controllers/items.controller.js")

const router = require("express").Router()
module.exports = router

router.get("/items", getAllItems)
router.get("/items/:itemId", getSingleItem)
router.get("/items/:itemId/reviews", getItemReviews)
router.get("/items/:itemId/reviews/:reviewId", getItemReview)