"use client"
import { useState, useEffect, useContext } from "react";
import SequentialDetails from "@/app/components/details/sequential";
import Sequential from "@/app/models/sequential";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';


export default withPageAuthRequired(function Details({ params }: any) {

    const [record, setRecord] = useState<Sequential>()
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    
    const fetchPromptRecord = async () => {
        await fetch('/api/chains/get_chains/'+ params.id).then((res) => res.json()).then((data) => {
           setRecord(data);
           setIsLayoutReady(true);
        })
    }

    useEffect(() => {
        if (params.id !== 'create-new') {
            fetchPromptRecord();
        }
        setTimeout(() => {
            setIsLayoutReady(true);
        }, 1000)

    }, [])

    return (
        <>
            {isLayoutReady && <div className="container"><SequentialDetails sequential={record} /></div>}
        </>

    )

})