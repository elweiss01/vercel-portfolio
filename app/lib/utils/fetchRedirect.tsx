
const fetchRedirect = async (url:string, postBody:string) => {
    
    return await fetch(url, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(postBody)
    }).then((res:any) => {
        if(res.ok) {
            history.back();
        }
    }).catch((error: any) => {
        console.log(JSON.stringify(error))
    })


};

export {fetchRedirect};