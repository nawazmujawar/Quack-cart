require('dotenv').config()

const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://nawaz:" + process.env.MONGO_ATLAS_PW + "@rest-api-demo-app.tsdap.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
})

//const morgan = require("morgan")
const bodyParser = require("body-parser")


const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")
const userRoutes = require("./api/routes/users")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === "OPTIONS") {
        req.header('Access-Control-Allow-Method', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()

})

app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
app.use("/user", userRoutes)

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})

module.exports = app