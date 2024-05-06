import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const DELETE = withApiAuthRequired(async function DeleteChains(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const result =  await request.json();
   
 
  const deleteChainsEndpoint: any = process.env.HOST + "/sequential/"+ result +"?table_name=sequence"
  
  try {
     
    const deleteChain = await fetch(deleteChainsEndpoint,{
        method:'DELETE',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    const response = await deleteChain.json();
    
    return Response.json({ message: "OK", response }, { status: 200 });
    
  } catch (error) {
   
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})