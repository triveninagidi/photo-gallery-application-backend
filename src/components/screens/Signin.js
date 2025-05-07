import React, { useState, useContext } from 'react'
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import M from 'materialize-css'


const Signin=()=> {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const postData =()=>{
        const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$$/
        if(!emailCheck.test(email)){
            return  M.toast({html: "Invalid Email" })
        }

        axios.post('https://mypixelbackend.onrender.com/signin', {
        email: email,
        password: password,
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("jwt",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            dispatch({type:"USER",payload:res.data.user})
            M.toast({html: 'Signedin Sucessfull' })
            // history.push('/singin')
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response.data);
            M.toast({html: err.response.data.error })

        });
    }
    
    return (
        <div className='mycard'>
            <div className="card auth-card">
                <h2>MY PIXEL</h2>
                <input type='text' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={()=>postData()} className="btn waves-effect waves-light" >Signin</button>
                <h5><Link to="/signup">Don't have account ?</Link></h5>
            </div>
        </div>
    )
}


export default Signin;