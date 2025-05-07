const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")

// to get all posts
router.get("/allposts",requireLogin,(req,res)=>{
    Post.find()    //to find all post
    .populate("postedBy","name")   //to expand postedBy feild the econd parameter defines the only feild required
    .exec()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })

})

//
router.post("/createpost",requireLogin,(req,res)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"Require all fields"})
    }
    // console.log(req.user)
    // res.send("ok")
    req.user.password = undefined //not showing password of posted user
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    // console.log(post) || see below code console.log to hide passwd we use above code
    // {
    //     title: 'first post',
    //     body: 'lets get started with first post',
    //     photo: 'no photo',
    //     postedBy: {
    //       _id: new ObjectId("6488460e1db28e34fd8019a0"),
    //       name: 'loki',
    //       email: 'lokesh1414@gmail.com',
    //       password: '$2a$12$iii5wwRcgffdRhMEJf.ezOC8OjkgbdtNmkr4dZlABSTJEtIhByPIS',
    //       __v: 0
    //     },
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

//post created by user
router.get("/myposts",requireLogin,(req,res)=>{
    console.log(req.user)
    Post.find({postedBy:req.user._id})
    .populate("postedBy","name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

// Delete a post
    router.delete("/deletepost/:postId", requireLogin, (req, res) => {
        Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec()
        .then(( post) => {
            if (!post) {
            return res.status(404).json({ error: "Post not found" });
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
            post
                .deleteOne()
                .then(() => {
                res.json({ message: "Post deleted successfully" });

                })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ error: "Internal server error" });
                });
            } else {
            res.status(401).json({ error: "Unauthorized access" });
            }
        });
    });
    

module.exports = router;
