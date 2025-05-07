import React,{useEffect,useState,useContext} from 'react'
import { UserContext } from '../../App'
import axios from 'axios'
import M from 'materialize-css'

const Profile=()=> {
    const [mypics,setMypics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        axios.get('https://mypixelbackend.onrender.com/myposts',{
            headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>{
            const SortOrder = res.data.mypost.sort((a, b) =>     a.createdAt > b.createdAt ? -1 : 1,);
            console.log(res.data.mypost)
            // setMypics(res.data.mypost) 
            // console.log(res.data.myposts) 
            console.log(SortOrder)
            setMypics(SortOrder)
            
        })  
        .catch(error=>{
            console.log(error) 
        })
    },[]) 

    const deletePost = (postId) => {
        axios.delete(`https://mypixelbackend.onrender.com/deletepost/${postId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
            })
            .then(res => {
                console.log(res.data);
                M.toast({html: res.data.message })
                // Remove the deleted post from the mypics state
                setMypics(prevMypics => prevMypics.filter(pic => pic._id !== postId));
            })
            .catch(error => {
                console.log(error);
            });
        };

    return (
        <div style={{maxWidth:"1000px", margin:"0px auto"}}>
            <div style={{display:'flex',justifyContent:'space-around',margin: "30px 0px",borderBottom:'2px solid gray'}}>
                <div>
                    
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
                    src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="></img></div>
                <div  >
                    <h4>{state?state.name:"Loading..."}</h4>
                        {/* <div style={{display:'flex',justifyContent:'space-between',width:"108%"}}>
                            <h6>40 followers</h6>
                            <h6>40 followings</h6>
                            <h6>40 posts</h6>
                        </div> */}
                </div>
            </div>
            <div className='gallery ' >
                {
                    mypics.map((pic)=>{
                        return(
                            <div className='profile-pic' style={{width: "300px", height:"400px"}}>
                                <div >
                                    <img style={{maxHeight: "200px" }} className='item' src={pic.photo} alt={pic.title} ></img>
                                    {/* <button><i class="material-icons delete-icon" onClick={deleltePost(pic._id)}>delete</i></button> */}
                                    {/* <button onClick={()=>deleltePost(pic._id)} className="btn waves-effect waves-light download" >Delete </button> */}
                                </div>
                                    <div>
                                <button onClick={() => deletePost(pic._id)} className="btn waves-effect waves-light download" id='del' >Delete </button>
                                </div>
                                {/* <div>
                                <button onClick={()=>deleltePost(pic._id)} className="btn waves-effect waves-light download" id='del' >Delete </button>
                                </div> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Profile;
