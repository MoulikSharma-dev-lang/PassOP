// importing modules
import express from "express";
import PasswordUser from "./models/Password.js";
import mongoose from "mongoose";
import cors from "cors"
import fs from "fs/promises"

// important variables
const app = express()
const PORT = 3000

// connecting to database
mongoose.connect("mongodb://localhost:27017/passop").then((res)=>{
    console.log(`MongoDB connected to ${res.connection.host}`)
})

// middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next)=>{
    const logString = `New Request ${req.method} recieved at ${Date.now()} \n`
    fs.appendFile("logs.txt", logString)
    next()
})

// get all passwords
app.get("/get", async (req, res) => {
    try {
        const passwords = await PasswordUser.find({})
        res.status(200).json({success: true, passwords: passwords})
    } catch (error) {
        res.status(500).json({data: "Internal Server Error", success: false})
    }
})

// create a password
app.post("/create", async (req, res) => {
    try {
        const {site, username, password} = req.body
        await PasswordUser.create({
            site: site,
            username: username,
            password: password
        })
        res.status(200).json({data: "Password created successfully!", success: true})
    } catch (error) {
        console.log(error)
        res.status(500).json({data: "Internal Server Error", success: false, error: error})
    }
})

// delete a password by id
app.delete("/delete", async (req, res) => {
    try {
        const {id} = req.body
        await PasswordUser.findByIdAndDelete(id)
        res.status(200).json({data: "Password deleted successfully!", success: true})
    } catch (error){
        res.status(500).json({data: "Internal Server Error", success: false})
    }
})

// start the server
app.listen(PORT, ()=>{
    console.log("Server started!")
})