const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        postedBy:{type:ObjectId,ref:"User"}
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }},{
        timestamps: true,
})

mongoose.model("Post",postSchema)

//this modes describe how post data is stored in mongo db
