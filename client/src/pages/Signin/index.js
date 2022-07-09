import React from "react";
import {useState} from "react";
import {useNavigate } from "react-router-dom";


import SquareLoader from "../../components/SquareLoader";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";


function Signin(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState("");

  const history = useNavigate();

  function validate(){
      if(email && password){
        return true
      }
      return false;
   }
  function HandleForm(){
     if(validate()){
          setLoading(true);
          let res=  API.signIn({email,password})
          .then((res)=>{
              console.log(res)
            setLoading(false);
            if(res.data.status==="success"){
              API.setToken(res.data.token);
              API.setAuthHeader();
              history("/");
            }
            
          })
          .catch((res)=>{
            //  console.log(res,"ghjkl")
             res=res.response;
             setLoading(false);
             errorHandler(true,res.data.msg);
          });
      }
      else{
          errorHandler(true,"Fill all detail");
      }
  };

  return ( 
    <>
    <SquareLoader  loading={loading} msg={"Please wait we will let you in"}/>
    <div className="user">
      <p>Welcome Back</p>
    </div>  
    <div className="signin_container">
      <div className="form_container">

          <div className="form_input">
            <label for="name"> Email </label>
            <input type="email" placeholder="Email..." name="email" required={true} onChange={(e)=>{setEmail(e.target.value);}} value={email}/>
          </div>

          <div className="form_input">
            <label for="password"> Password </label>
            <input type="password" placeholder="Password..." name="password" required={true} onChange={(e)=>{setPassword(e.target.value);}}value={password} />
          </div>

          <div className="form_button">
             <input type="submit" name="signin" value="SIgn In" className="signin_button" onClick={HandleForm}  />
          </div>

      </div>
    </div>
    </>);

  }

export default Signin;
