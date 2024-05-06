"use client"
import React from "react";
import { FaRegCircleUser, FaGears } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import logo from "@/app/public/logo.png"


const Navbar = () => {
  const { user} = useUser();

 

  return (
    
    user && (
      <>
      <nav className="navbar navbar-expand-lg navbar-light bg-black sticky-top">
      <a className="navbar-brand" href="/"><Image alt="pegasus" src={logo} width={50} height={50}/></a>
        <div className="container">
          <a className="navbar-brand" href="#"></a>
          <div className="dropdown p-0 mt-2 float-right">
            <button className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <span className="text-white float-left pt-1 p-2"> { "Hello " + user?.name}! </span> <FaRegCircleUser className="float-right" color="white" size="30px" /> 
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#"><ImProfile size={20} className="float-left mr-4" /> Profile</a>
              <a className="dropdown-item" href="#"> <FaGears size={20} className="float-left mr-4" /> Settings </a>
              <a className="dropdown-item" href="api/auth/logout"> <FaDoorOpen size={20} className="float-left mr-4" /> Log Out</a>
            </div>
          </div>
        </div>
      </nav>
    </>
    )
    
  )
};

export default Navbar;