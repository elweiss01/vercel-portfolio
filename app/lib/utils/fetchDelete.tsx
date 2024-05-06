
const fetchDeleteItem = async (url:string, redirect:string, postBody:string) => {
    
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(postBody)
    }).then((res:any) => {
        if(res.ok) {
           (redirect == '' || redirect == undefined ? window.location.reload() : window.location.replace(redirect))
        }
    }).catch((error: any) => {
        console.log(JSON.stringify(error))
    })


};

const fetchDeleteItems = async (url:string, redirect:string, postBody:string) => {
    
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"

        },
        body: JSON.stringify(postBody)
    }).then((res:any) => {
        if(res.ok) {
            (redirect == '' || redirect == undefined ? window.location.reload() : window.location.replace(redirect))
        }
    }).catch((error: any) => {
        console.log(JSON.stringify(error))
    })


};

export {fetchDeleteItem, fetchDeleteItems};