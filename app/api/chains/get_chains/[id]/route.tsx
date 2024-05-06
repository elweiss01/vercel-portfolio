import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const GET =  withApiAuthRequired( async function GetChains(request:Request,{params}:any) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
 
  const listChainsEndPoint: any = process.env.HOST + "/sequential/" + params.id

  const listChains = await fetch(listChainsEndPoint, {
    headers: {
      "Authorization": 'Basic ' + btoa(auth),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
 
  const response = await listChains.json();
 
  return Response.json(response.message);
  
})

export const revalidate = 0;