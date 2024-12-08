const { 
    allUsers,
    changeReview,
    changeComment,
    deleteComment,
    deleteReview,
} = require("../controllers/users.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")
const router = require("express").Router()
module.exports = router

router.get("/users", isLoggedIn, allUsers)
router.put("/users/:userId/reviews/:reviewId", isLoggedIn, changeReview)
router.put("/users/:userId/comments/:commentId", isLoggedIn, changeComment)
router.delete("/users/:userId/comments/:commentId", isLoggedIn, deleteComment)
router.delete("/users/:userId/reviews/:reviewId", isLoggedIn, deleteReview)