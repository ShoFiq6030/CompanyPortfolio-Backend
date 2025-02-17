const express = require('express')
const router = require('./src/routes/api')
const navRouter = require('./src/routes/navApi')
const heroRouter = require('./src/routes/heroApi')
const teamRouter = require('./src/routes/teamApi')
const partnersRouter = require('./src/routes/partnersApi')
const socialLinkRouter = require('./src/routes/socialLinkApi')
const userRouter = require('./src/routes/userApi')

const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();


//Security Midduleware
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')



//Security Midduleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

// BodyParser 
app.use(bodyParser.json())

//Rate Limiter 
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// Database
const mongoose = require('mongoose')
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {

        console.log("DB Connected");
    })
    .catch((err) => console.log(err));


// Frontend Tagging (If needed)
// app.use(express.static('client/dist'))
// app.get("*", function (req, res) {
//     res.sendFile(__dirname + '/client/dist/index.html');
// });

// Managing BackEnd API Routing
app.use("/api/v1", router)
app.use("/api/v1/nav", navRouter)
app.use("/api/v1/hero", heroRouter)
app.use("/api/v1/team", teamRouter)
app.use("/api/v1/partners", partnersRouter)
app.use("/api/v1/socialLink", socialLinkRouter)
app.use("/api/v1/user", userRouter)


module.exports = app