import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home=()=> {
    const [data,setData] = useState([])

    useEffect(()=>{
        axios.get('https://mypixelbackend.onrender.com/allposts',{
            headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>{
            const SortOrder = res.data.posts.sort((a, b) =>     a.createdAt > b.createdAt ? -1 : 1,);
            console.log(res.data.posts)
            // setData(res.data.posts)
            setData(SortOrder)
            
        })
        .catch(error=>{
            console.log(error)
        })
    },[])


    const handleDownload = (imageUrl) => {
            axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'blob',
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                console.log(url);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.jpg');
                // console.log(link.href);
                document.body.appendChild(link);
                // console.log(link)
                // <a href="blob:http://localhost:3000/d9c739a3-a925-46fd-a2b0-44ca2ca7f917" download="image.jpg"></a>
                link.click();
                link.remove();
            })
            .catch(error => {
                console.log(error);
            });
        };
    return (
        <div>
        <div className='scrolling-sentence'>
            <h6 className='one'>
                    Welcome to MY PIXEL! This platform provides you with the chance to share and discover an extensive range of captivating photographs..</h6>
            </div><br></br>
        <div className='home' >
            
            {
                data.map((pic)=>{
                    return(
                    <div className='card home-card'  style={{width: "500px", height:"400px"}} key={pic._id}>
                        <h5 className='upload-by'>{pic.postedBy.name}</h5>
                        <div className='card-image'>
                            <img style={{maxHeight: "200px" }} src={pic.photo}/>
                        </div>
                        <div className='card-context'>
                            <h6 style={{position:"absolute", bottom:"90px"}}>{pic.title}</h6>
                            <p style={{position:"absolute", bottom:"60px"}}>{pic.body}</p>
                            {/* <form 
                                //onSubmit={(e)=>{
                                //e.preventDefault()
                                //console.log(e.target[0].value)
                                // makeComment(e.target[0].value,pic._id) }}
                                >
                            <input type='text' placeholder='comment'></input>
                            </form> */}
                            <button onClick={()=>handleDownload(pic.photo)} className="btn waves-effect waves-light download" id='download' >Download </button>
                            
                            
                        </div>
                    </div>
                    )
                
                })
            }
            
            
        </div>
        </div>
    )
}


export default Home;
