const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
// const requireLogin = require("../middleware/requireLogin")

// router.get("/protected",requireLogin,(req,res)=>{
//     res.send("hi")
// })

router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    // console.log(req.body)
    if (!name || !email || !password){
        return res.status(422).json({error:"Require all fields"})
    }
    // res.json({message:"Signup Sucessful"})
    User.findOne({email:email})
    .then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"Email alredy exist"})
        }
        bcrypt.hash(password,12)    //here we enrypt the password to store in DB
        .then(hashedpassword=>{
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json({message:"Signup Sucessful"})
            })
            .catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/signin",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Require all fields"})
    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,saveduser.password)
        .then(domatch=>{
            if(domatch){
                // res.json({message:"Sucessfully Login"})
                const token = jwt.sign({_id:saveduser._id},JWT_SECRET)  //here we provide tokenbased on the user id and store it in a _id with appending JWT_SECRET
                const {_id,name,email} = saveduser
                res.json({token,user:{_id,name,email}})
            }
            else{ 
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router;
