const express = require('express')
const mongoose = require('mongoose');
const { RedisStore } = require("connect-redis")
const session = require("express-session")
const { createClient } = require("redis")
const cors = require('cors')

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

let redisClient = createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` })
redisClient.connect().catch(console.error)

const app = express()
let attemptsConnection = 0

const connectWithRetry = () => {
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    mongoose
        .connect(mongoURL)
        .then(() => console.log('succesfully connected to DB'))
        .catch((e) => {
            console.log(e)
            setTimeout(() => {
                attemptsConnection++
                if (attemptsConnection <= 6) connectWithRetry()
            }, 5000);
        });
}
connectWithRetry()

app.enable("trust proxy")

app.use(cors())
app.use(session({
    proxy: true,
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000      // in ms
    }
}))
app.use(express.json())

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hi there!!!</h2>")
    console.log("yeah it ran")
})

app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))