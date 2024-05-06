import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async function CreateChain(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const createChainsEndpoint: any = process.env.HOST + "/sequential/"

  const body = await request.json();
 
  try { 
        const createChains = await fetch(createChainsEndpoint,{
        method:'POST',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: body
    })

    const response = await createChains.json();
    
    return Response.json({ message: "OK", response }, { status: 201 });
    
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})

export const revalidate = 0;

