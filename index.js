const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const postRoutes = require('./routes/postRoutes')

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
                if(attemptsConnection <= 6) connectWithRetry()
            }, 5000);
        });
}

const port = process.env.PORT || 3000
connectWithRetry()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h2>Hi there</h2>")
})

app.use("/api/v1/posts", postRoutes)

app.listen(port, () => console.log(`listening on port ${port}`))