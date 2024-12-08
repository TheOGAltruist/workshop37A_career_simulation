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

//Delete self comment (Protected)
const deleteComment = async (req, res, next) => {
    if (req.user.id === +req.params.userId) {
        try {
            const response = await prisma.comment.delete({
                where: {
                    id: +req.params.commentId,
                    user_id: req.user.id
                }
            })
    
            res.status(204).send()
        } catch (error) {
            if (error.code == "P2025") {
                next({
                    statusCode: 404,
                    message: error.meta?.cause
                })
            } else {
                next(error)
            }
            
            
        }
    } else {
        next({
            statusCode: 403,
            message: "Forbidden"
        })
    }

}

//Delete self review (Protected)
const deleteReview = async (req, res, next) => {
    console.log("Testing")
    if (req.user.id === +req.params.userId) {
        try {
            const response = await prisma.review.delete({
                where: {
                    id: +req.params.reviewId,
                    user_id: req.user.id
                }
            })
            
            res.status(204).send()
        } catch (error) {
            
            if (error.code == "P2025") {
                next({
                    statusCode: 404,
                    message: error.meta?.cause
                })
            } else {
                next(error)
            }
        }
    } else {
        next({
            statusCode: 403,
            message: "Forbidden"
        })
    }

}

module.exports = {
    allUsers,
    changeReview,
    changeComment,
    deleteComment,
    deleteReview,
}