"use client"
import { useState, useEffect, useContext } from "react";
import PromptDetails from "@/app/components/details/prompts";
import Prompt from "@/app/models/prompt";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Details({ params }: any) {

    const [record, setRecord] = useState<Prompt>()
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const getType = params.prompt.split('-')[0] //get type from name will need to refactor with new services

    const fetchPromptRecord = async () => {
        await fetch('/api/prompts/get_prompts/' + params.prompt + '/' + getType).then((res) => res.json()).then((data) => {
            setRecord(data);
            setIsLayoutReady(true);
        })
    }

    useEffect(() => {
        if (params.prompt != 'create-new') {
            fetchPromptRecord();

        }
        setTimeout(() => {
            setIsLayoutReady(true);
        }, 1000)

    }, [])

    return (
        <>
            {isLayoutReady && <div className="container"><PromptDetails getPrompt={record} promptType={getType} promptName={params.prompt}/></div>}
        </>

    )

})