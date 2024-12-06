const prisma = require("../../prisma")

const me = async (req, res, next) => {

}

const allUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                reviews: true,
                comments:true
            },
        })        
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
};



module.exports = {
    me,
    allUsers,
}