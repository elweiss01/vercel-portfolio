import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const GET =  withApiAuthRequired( async function GET(request:Request,{params}:any) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  
  const listPromptsEndPoint: any = process.env.HOST + "/prompt/list_prompts?prompt_type="+params.prompt_type

  const listPrompts = await fetch(listPromptsEndPoint, {
    headers: {
      "Authorization": 'Basic ' + btoa(auth),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
 
  const response = await listPrompts.json();
  
  return Response.json(response.message);
  
})

export const revalidate = 0;