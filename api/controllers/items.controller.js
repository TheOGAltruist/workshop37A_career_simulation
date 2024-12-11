const prisma = require("../../prisma")

//Function to get all items
const getAllItems = async (req, res, next) => {
    try {
        const items = await prisma.item.findMany({
            include: {
                reviews: {
                    include: {
                        comments: true,
                    },
                }
            },
        })        
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
};

// Function to get a single item
const getSingleItem = async (req, res, next) => {
    try {
        const id = +req.params.itemId;
        const item = await prisma.item.findUnique({ 
            where: { 
                id: id
            },
            include: {
                reviews: {
                    include: {
                        comments: true,
                    },
                }
            },
        });

        if (!item) {
            return next({
                statusCode: 404,
                message: `Could not find item with id ${id}.`,
            });
        }

        res.json(item);
        
    } catch (error) {
        next(error)
    }
}

//Function to get reviews of an item
const getItemReviews = async (req, res, next) => {
    try {
        const id = +req.params.itemId;
        const item = await prisma.item.findUnique({ 
            where: { 
                id: id
            },
            include: {
                reviews:true
            }
        });

        if (!item) {
            return next({
                statusCode: 404,
                message: `Could not find item with id ${id}.`,
            });
        }

        res.json(item);
        
    } catch (error) {
        next(error)
    }
}

//Function to get a specific review of an item
const getItemSingleReview = async (req, res, next) => {
    try {
        const itemId = +req.params.itemId;
        const reviewId = +req.params.reviewId
        const item = await prisma.item.findUnique({ 
            where: { 
                id: itemId
            },
            include: {
                reviews:{
                    where: {
                        id: reviewId
                    }
                }
            }
        });

        if (!item) {
            return next({
                statusCode: 404,
                message: `Could not find item with id ${itemId} or a review with id ${reviewId}.`,
            });
        }

        res.json(item);
        
    } catch (error) {
        next(error)
    }
}

//Function to post a review for an item (Protected)
const postItemReview = async (req, res, next) => {
    try {
        const result = await prisma.review.create({
            data: {
                text: req.body.text,
                rating: req.body.rating,
                item_id: +req.params.itemId,
                user_id: req.user.id
            },
        });

        res.status(201).json(result)
    } catch (error) {
        if (error.code == "P2002") {
            next({
                statusCode: 409,
                message: "Cannot post more than 1 review"
            })
        } else {
            next(error)   
        }
    }
}

//Function to post a comment on an existing review (Protected)
const postItemReviewComment = async (req, res, next) => {
    try {
        const result = await prisma.comment.create({
            data: {
                text: req.body.text,
                item_id: +req.params.itemId,
                user_id: req.user.id,
                review_id: +req.params.reviewId
            },
        });

        res.status(201).json(result)
    } catch (error) {
        if (error.code == "P2002") {
            next({
                statusCode: 409,
                message: "Cannot post more than 1 review"
            })
        } else {
            next(error)   
        }
    }
}

module.exports = {
    getAllItems,
    getSingleItem,
    getItemReviews,
    getItemSingleReview,
    postItemReview,
    postItemReviewComment,
}