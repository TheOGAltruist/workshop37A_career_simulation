require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./routes/users.routes.js")
const itemRouter = require("./routes/items.routes.js")
const authRouter = require("./routes/auth.routes.js")
const reviewRouter = require("./routes/review.routes.js")
const commentrouter = require("./routes/comment.routes.js")

app.use(require("morgan")("dev"))
app.use(express.json())

app.listen(process.env.PORT, () => {console.log("App running on Port 3000..")})

app.use("/api", userRouter)
app.use("/api", itemRouter)
app.use("/api", authRouter)
app.use("/api", reviewRouter)
app.use("/api", commentrouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

module.exports = app;