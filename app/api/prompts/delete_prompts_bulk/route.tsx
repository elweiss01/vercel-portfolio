import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const DELETE = withApiAuthRequired(async function DeletePromptsBulk(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const payload =  await request.json();
  
  const deletePromptsEndpoint: any = process.env.HOST + "/prompt/bulk_delete?prompt_type=seq"
  
  try {
    
    const deleteUsersBulk = await fetch(deletePromptsEndpoint,{
        method:'DELETE',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: payload
    })

    const response = await deleteUsersBulk.json();
    
    return Response.json({ message: "OK", response }, { status: 200 });
    
  } catch (error) {
    console.log(error)
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})