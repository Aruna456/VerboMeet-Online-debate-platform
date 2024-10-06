import React, { useRef } from "react";
import Photo from "../assets/img/debate.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import "../assets/css/core.css";
const Home = ()=>{
    const name=useRef(null);
    const Email=useRef(null);
    const Password=useRef(null);
   // const Phone=useRef(null);
    const startPage=useNavigate();
    
    const [Login,SetLogin]=useState(false);
    const [form,setForm]=useState(false);
    const handleform=()=>{
        setForm(!form);
    }
    // const open=false;
    const HandelSubmit=(e)=>{
      e.preventDefault();
      SetLogin(!Login)
    }
    const next=()=>{
        if(Login){
        startPage("/Landingpage");}
        else{
            alert("Login or Register");
        }
    }
   return (
    <>
     <div className="cursor-pointer w-screen h-screen">
    <div className="w-full h-screen  flex justify-center items-center"
    style={{backgroundImage:`url(${Photo})`}}>
        <div className="w-1/3 h-1/3  hover:backdrop-blur-sm bg-slate-400 bg-opacity-50 flex flex-col justify-center items-center hover:border-4 hover:border-blue-500 rounded-md">
            <p className="cursor-pointer font-bold text-3xl flex flex-col justify-center items-center">
           <p className="flex justify-center"> Your Voice, Your Debate</p>
           <p className="flex justify-center pb-4 "> Lock It In!</p>
            <p onClick={next}className="p-3 w-8/12 text-lg rounded-3xl text-white hover:bg-green-500 flex justify-center items-center bg-blue-400">
                Get Start
            </p>
            </p>
        </div>
    <p onClick={handleform} className="p-2 absolute top-5 right-5 border-2 border-black  rounded-lg hover:border-blue-500 hover:border-4 cursor-pointer">
         Login
        </p>
        {form&&(
       <div className="cursor-pointer fixed w-full h-full flex justify-center items-center">
       <div className="relative w-2/6 h-3/6 bg-cover flex justify-center items-center rounded-lg  bg-blue-400">
        <from onClick={HandelSubmit} className="w-4/6 h-5/6  flex flex-col justify-center items-center space-y-5"> 
            <p className="flex justify-center text-4xl text-white">Login</p>
            <input 
            type="text"
            ref={name||Email}
            placeholder="Enter the username or Email"
            className="pl-3 w-full rounded-lg h-10"/>
            <input 
            type="Password"
            ref={Password}
            placeholder="Enter the Password"
            className="pl-3 w-full rounded-lg h-10"/>
            <div className="w-full space-x-2 ">
            <input
            type="submit"
            placeholder="Submit"
            onClick={handleform}

             className="cursor-pointer w-2/5 bg-green-500 hover:bg-green-600 text-white text-lg  rounded-lg h-10"/>
             <input
             type="text"
            placeholder="Cancel"
            onClick={handleform }
             className="cursor-pointer w-2/5  bg-slate-100 hover:bg-slate-200 text-white text-lg p-2  rounded-lg h-10"/>
       </div> </from>
       </div>
        </div>
        )}
        </div>
        </div>
    </>
   )
}
export default Home;