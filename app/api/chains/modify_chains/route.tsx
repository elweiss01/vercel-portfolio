import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async function ModifyChain(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const body:any = await request.json();
  const chainData = JSON.parse(body); 

  const modifyChainsEndpoint: any = process.env.HOST + "/sequential/" + chainData.id
 
  try { 
        const modifyChains = await fetch(modifyChainsEndpoint,{
        method:'PUT',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: body
    })

    const response = await modifyChains.json();
   
    return Response.json({ message: "OK", response }, { status: 201 });
    
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})

export const revalidate = 0;

