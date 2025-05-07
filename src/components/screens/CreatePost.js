import React,{ useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import M from 'materialize-css'

const CreatePost = () =>{
    const navigate = useNavigate();
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
        //http://localhost:5000
        if(url){
        axios.post('https://mypixelbackend.onrender.com/createpost', {
        title:title,
        body:body,
        pic:url,
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            },
        })
        .then((res) => {
            console.log(res.data);
            M.toast({html: "post created" })
            // // history.push('/singin')
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response);
            // M.toast({html: err.response })

        });

        // fetch("https://mypixelbackend.onrender.com/createpost",{
        //     method:"POST",
        //     headers:{"Content-Type":"application/json"},
        //     body:JSON.stringify({
        //         title,
        //         body,
        //         pic:url
        //     })
        // }).then(res=>{
        //     res.json() 
        // }).then(data=>{
        //     // console.log(data)
        //     if(data.error){
        //         M.toast({html: data.error })
        //     }else{
        //         M.toast({html: "post sucessful" })
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }
    },[url])

    const post=()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","pixlink")
        data.append("cloud_name","lokesh1452739")
        fetch("https://api.cloudinary.com/v1_1/lokesh1452739/image/upload",{
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.secure_url)
            setUrl(data.secure_url)
        })
        .catch(err=>{
            console.log(err)
        })

        
    }
    return(
        <div className="card input-filed">
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn" style={{width:"150px"}}> 
                <span>Images</span>
                <input type="file" multiple accept=".jpg, .png, .jpeg" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light" on onClick={post}>Post</button>
        </div>
    )
}

export default CreatePost;


