import React,{useEffect, createContext, useReducer,useContext} from 'react';
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()


const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    // console.log(typeof(localStorage.getItem("user")))
    const user = JSON.parse(localStorage.getItem("user")) // converting above string typr to object annd store in user
    // console.log(typeof(user))
    if(user){
      dispatch({type:"USER",payload:user})
      // navigate("/")
    }else{
      navigate("/signin")
    }
  },[])
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/createpost' element={<CreatePost/>}/>
          </Routes>
      </div>
  )
}

function App() {
  
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div>
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        
          <Routing/>
        
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
