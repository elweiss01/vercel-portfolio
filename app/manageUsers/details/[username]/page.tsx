"use client"
import { useState, useEffect } from "react";
import UserDetails from "../../../components/details/users";
import User from "@/app/models/user";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Details({ params }: any) {

    //set empty user record for creation
    let newUser: User = {
        uuid:'string',
        email: '',
        username: '',
        password: ''
    }

    const [record, setRecord] = useState<User>(newUser)
    const [isLayoutReady, setIsLayoutReady] = useState(false);
   
    
    
        useEffect(() => {
            if (params.username != 'create-new') {
            fetch('/api/users/get_users/' + params.username).then((res) => res.json()).then((data) => {
                setRecord(data);
                setIsLayoutReady(true);
            })
        }
            setTimeout(() => {
                setIsLayoutReady(true);
            }, 1000)
        
        },[])
     
    return (
        <>
         {isLayoutReady  && <div className="container"><UserDetails userName={params.username} record={record} /></div> }
        </>
      
    )

})