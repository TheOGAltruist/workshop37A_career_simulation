const prisma = require("../../prisma")

// Get my reviews
const myReviews = async (req, res, next) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                item: true
            }
        });

        res.json(reviews)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    myReviews
}