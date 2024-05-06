import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const DELETE = withApiAuthRequired(async function DeletePrompts(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const result =  await request.json();
   //temporary scrub to fix api parsing issue
   
  const scrubPrompt = result.split('.')[0].replace('seq-','').replace('rag-','')
  const scrubType = result.split('-')[0]
  const deletePromptsEndpoint: any = process.env.HOST + "/prompt/delete_prompt?prompt_name="+ scrubPrompt +"&prompt_type=" + scrubType
  
  try {
     
    const deletePrompts = await fetch(deletePromptsEndpoint,{
        method:'DELETE',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    const response = await deletePrompts.json();
    
    return Response.json({ message: "OK", response }, { status: 200 });
    
  } catch (error) {
   
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})