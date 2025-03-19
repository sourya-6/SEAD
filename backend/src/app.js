import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()
//initializing cors
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))//shows the how much space is needed
app.use(express.urlencoded({extended:true,limit:"16kb"}))//used to store the form data
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/auth.route.js"
app.use("/api/v1/user",userRouter)

export {app}