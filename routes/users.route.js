const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/usersmodel")

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,pass} = req.body

    try {
        bcrypt.hash(pass, 5, async(err,hash) => {
            if(err){
                res.status(200).send({"error":err})
            }
            else {
                const user = new UserModel({name,email,gender,pass:hash})
                await user.save()
                res.status(200).send({"msg":"A new user has been registered"})
            }
        })
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

userRouter.post("/login",async(req,res) => {
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user) return res.status(200).send({"msg":"Please register first"})
        bcrypt.compare(pass, user.pass, (err,result)=>{
            if(result){
                const token = jwt.sign({userID:user._id, name:user.name},"masai")
                res.status(200).send({"msg":"Login Successfull", "token":token})    
            } else {
                res.status(200).send({"error":"Wrong Credentials"})
            }
        })
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

module.exports={
    userRouter,
}