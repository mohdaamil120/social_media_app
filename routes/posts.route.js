const express = require("express")
const jwt = require("jsonwebtoken")
const { auth } = require("../middleware/auth")
const { PostModel } = require("../models/postsmodel")

const postRouter = express.Router()

postRouter.post("/add",auth,async(req,res)=>{
    try {
        const {title,body,device} = req.body
        const newPost = new PostModel({title,body,device,userID:req.body.userID})
        await newPost.save()
        res.status(200).send({"msg":"A new post has been added"})
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    try {
        const {device} = req.query
        let ans;
        if(device){
            ans= await PostModel.find({userID:req.body.userID,device})
            res.status(200).send(ans)
        }
        else{
         ans = await PostModel.find({userID:req.body.userID})
        res.status(200).send(ans)
        }
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID} = req.params
    try {
        const post = await PostModel.findOne({_id:postID})
        if(req.body.userID === post.userID){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":"A user is updated"})
        } else {

            res.status(200).send({"msg":"you are not authorized"})
        }
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

postRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID} = req.params
    try {
        const post = await PostModel.findOne({_id:postID})
        if(req.body.userID === post.userID){
            await PostModel.findByIdAndUpdate({_id:postID})
            res.status(200).send({"msg":"A user is deleted"})
        } else {
            res.status(200).send({"msg":"you are not authorized"})
        }
    } catch (err) {
        res.status(400).send({"error":err})
    }
})

module.exports={
    postRouter,
}