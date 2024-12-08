const prisma = require("../../prisma")

//Get all users
const allUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                reviews: true,
                comments:true
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        })        
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
};

//Modify self review (Protected)
const changeReview = async (req, res, next) => {
    try {
        const response = await prisma.review.update({
            where: {
                user_id: req.user.id,
                id: +req.params.reviewId
            },
            data: {
                text: req.body.text
            }
        });

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Modify self comment (Protected)
const changeComment = async (req, res, next) => {
    try {
        const response = await prisma.comment.update({
            where: {
                user_id: req.user.id,
                id: +req.params.reviewId
            },
            data: {
                text: req.body.text
            }
        });

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    allUsers,
    changeReview,
    changeComment,
}