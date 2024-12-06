const prisma = require("../../prisma")

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

const getSingleItem = async (req, res, next) => {
    try {
        const id = +req.params.itemId;
        const item = await prisma.item.findUnique({ 
            where: { 
                id: id
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

const getItemReview = async (req, res, next) => {
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

module.exports = {
    getAllItems,
    getSingleItem,
    getItemReviews,
    getItemReview
}