const prisma = require("../../prisma")

// Get my reviews
const myComments = async (req, res, next) => {
    try {
        const comments = await prisma.review.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                item: {
                    review: true
                }
            }
        });

        res.json(comments)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    myComments
}