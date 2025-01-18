const express = require("express")
const app =express()
const dbConnection  = require("./dBConnection/connection")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const rateLimit =  require("express-rate-limit")
const cors = require("cors")
require("dotenv").config()


dbConnection() 

const limiter = rateLimit({
	windowMs: 1, 
	limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(limiter)

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true        
}))
app.use(express.json())

app.use("/user",userRoutes)
app.use("/task",taskRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server running ON ${process.env.PORT}`);
})                                                                           