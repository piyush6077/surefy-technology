import express from "express"
import app from "./app"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 5000  

app.listen(PORT , ()=> {
    console.log(`The server started at http://localhost:${PORT}`)
})