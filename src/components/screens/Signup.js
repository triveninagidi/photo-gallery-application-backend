import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import M from 'materialize-css'

const Signup=()=> {
    // const history = useHistory();
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const postData=()=>{
        const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$$/
        if(!emailCheck.test(email)){
            return  M.toast({html: "Invalid Email" })
        }

        axios.post('https://mypixelbackend.onrender.com/signup', {
        name: name,
        email: email,
        password: password,
        })
        .then((res) => {
            console.log(res.data);
            M.toast({html: res.data.message })
            // history.push('/singin')
            navigate('/signin')
        })
        .catch((err) => {
            console.log(err.response.data);
            M.toast({html: err.response.data.error })

        });


    //     fetch("https://mypixelbackend.onrender.com/signup",{
    //         method:"POST",
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify({
    //             name:"",
    //             email:"",
    //             password:""
    //         })
    //     }).then(res=>{
    //         res.json() 
    //     }).then(data=>{
    //         console.log(data)
    //     })
        // console.log(name)
        // console.log(email)
        // console.log(password)
    }
    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>MY PIXEL</h2>
                <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='text' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={()=>postData()} className="btn waves-effect waves-light" >Signup</button>
                <h5><Link to="/signin">Already have account ?</Link></h5>
            </div>
        </div>
    )
}

export default Signup;