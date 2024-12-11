require("dotenv").config()
const prisma = require("../../prisma")
const jwt = require("jsonwebtoken")

//Middleware function for protected routes
const isLoggedIn = async (req, res, next) => {
    try {
        const receivedToken = (req.headers.authorization).split(" ")[1]
        req.user = await findUserWithToken(receivedToken);
        next();
    } catch (error) {
        next({
            statusCode: 401,
            message: "Unauthorized"
        })
    }
}

//Find user using token
const findUserWithToken = async (token) => {
    let id;
    let issuer;
    
    try {
        const payload = await jwt.verify(token, process.env.JWT);
        id = payload.id
        issuer = payload.iss
    } catch (err) {
        const error = new Error(`Unauthorized. ${err.message}`)
        error.statusCode = 401
        throw error
    }

    try {
        const user = await prisma.user.findUnique({
            where: { 
                id: id
            },
            select: {
                id: true,
                username: true,
                name: true
            }
        });

        if (!user || (issuer === "workshop37A") === false) {
            const error = new Error("Unauthorized")
            error.statusCode = 401
            throw error
        }
        
        return user;
    } catch (error) {
        throw error
    }
}

module.exports = {
    isLoggedIn,
    findUserWithToken
}