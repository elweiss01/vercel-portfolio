import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async function ModifyPrompt(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const modifyPromptsEndpoint: any = process.env.HOST + "/prompt/modify_prompt"

  const body = await request.json();
 
  try { 
        const updatePrompts = await fetch(modifyPromptsEndpoint,{
        method:'PUT',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: body
    })

    const response = await updatePrompts.json();
    
    return Response.json({ message: "OK", response }, { status: 201 });
    
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})

export const revalidate = 0;

