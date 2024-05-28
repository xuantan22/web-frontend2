import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const LoginSignup = () => {
  const [state,setState] = useState("Login");

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const changeData = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})
  } 
  const login = async () => {
    let responseData;
    await fetch('https://commerce-backend-154x.onrender.com/login',{
        method:'POST',
        headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    })
    .then((res)=>res.json())
    .then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }else{
      console.log(responseData.error);
    }
  }


  const signup = async () => {
    let responseData;
    await fetch('https://commerce-backend-154x.onrender.com/signup',{
        method:'POST',
        headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
  }

  const notifyLogin = ()=>{
    state==="Login"?login():signup();
    toast.success("Login is success!");

  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up" 
          ?<input 
              type='text' onChange={changeData}
              placeholder='Your Name' 
              name="name" 
              value={formData.name}
          />:<></>
          }

          <input type='text' 
                  placeholder='Email Address' 
                  name="email" 
                  value={formData.email}
                  onChange={changeData}
          />


          <input 
                type='password' 
                placeholder='Password' 
                name="password" 
                value={formData.password}
                onChange={changeData}
          />
        </div>
        <button onClick={()=>{notifyLogin()}}>Continue</button>
        <ToastContainer/>
        {state==="Login"? 
            <p className='loginsingup-login'>Create a account?
              <span onClick={()=>{setState("Sign Up")}}>Click here</span>  
            </p>
            :
            <p className='loginsingup-login'>Already have an account?
              <span onClick={()=>{setState("Login")}}>Login here</span>  
            </p>
        }
          <div className="loginsignup-agree">
            <input type='checkbox' name="" id=""/>
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
      </div>
    </div>
  )
}
export default LoginSignup