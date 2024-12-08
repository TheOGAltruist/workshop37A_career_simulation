const prisma = require("../../prisma")

// Get my reviews
const myComments = async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                item: {
                    include: {
                        reviews: true
                    }
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