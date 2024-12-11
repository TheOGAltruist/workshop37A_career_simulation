require("dotenv").config()
const prisma = require("../../prisma")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//Login function
const login = async (req, res, next) => {
    try {
        const response = await prisma.user.findUniqueOrThrow({
            where: {
                username: req.body.username
            }
        })

        if(!response || (await bcrypt.compare(req.body.password, response.password)) === false) {
            next({
                statusCode: 401,
                message: "Unauthorized. Incorrect username or password. Try again!"
            })
        } else {
            const token = await jwt.sign({ id: response.id, username: response.username, iss: "workshop37A" }, process.env.JWT, { expiresIn: '1h' })
            res.json({
                token: token,
                token_type: "Bearer"
            })
        }
    } catch (error) {
        next(error)
    }
}

//Register function
const register = async (req, res, next) => {
    try {
        const response = await prisma.user.create({
            data: {
                name: req.body.name,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, Math.floor(Math.random() * 10) + 1)
            },
            select: {
                id: true,
                name: true,
                username: true
            }
        })

        const token = await jwt.sign({ id: response.id, username: response.username, iss: "workshop37A" }, process.env.JWT, { expiresIn: '1h' })
        res.json({
            Id: response.id,
            Name: response.name,
            Username: response.username,
            token: token,
            token_type: "Bearer"
        })
    } catch (error) {
        next({
            statusCode: 409,
            message: "Username is not unique. Please choose another username and try again!"
        })
    }
}

//Return me object
const me = async (req, res, next) => {
    try {
        const me = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                name: true
            }
        })

        res.json(me)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register,
    me,
}