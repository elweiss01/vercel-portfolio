"use client"

import { useState } from "react";
import { Circles } from 'react-loading-icons';

const Invoke = ({user}:any) => {
    const [response, setResponse] = useState<any>('')
    const [isLoading, setIsLoading] = useState(false)

    const invoke = async () => {
       
        const getRequest: any = document.querySelector('input[name=request]')
        setIsLoading(true)
        const payload: any = { "query": getRequest.value, "username": user }
        await fetch('/api/invoke', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json()).then((data: any) => {
            setResponse(data.query)
            setIsLoading(false)
        }).catch((error: any) => {
            console.log(error)
        })
    }
   const handleKeyDown = (e:any) => {
        if (e.key === 'Enter') {
            invoke();
        }
      }
    


    return (
        <main className="container home-prompt">

            <div className="row w-100">
                
                    <div className="form-group ">
                        <div className="form-control mb-1 h-100"  >
                         {response}
                        </div>

                        <input onKeyDown={(e) => handleKeyDown(e)} className="form-control" type="text" id="request" name="request" placeholder="How can I help?" />
                        <button className="btn btn-primary mt-2 float-left"  onClick={() => invoke()} type="button" disabled={isLoading ? true : false}>Submit</button><Circles className={"p-1 mt-2 " + (isLoading ? "d-block" : "d-none")} stroke="#000" strokeOpacity={1} width="34" height="34" speed={.75} />

                    </div>
                
            </div>

        </main>
    );
}

export default Invoke;