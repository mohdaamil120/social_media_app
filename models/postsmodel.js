const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : {type:String, enum:["PC","MOBIL","TABLET"]},
    // device:String,
    userID : String,
    name : String,
},{
    versionKey: false
})

const PostModel = mongoose.model("post",postSchema)

module.exports={
    PostModel,
}
