
import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function GET(request:Request, {params}:any) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD

 //temporary scrub to fix api parsing issue
 const scrubPrompt = params.prompt.split('.')[0].replace('seq-','').replace('rag-','')

const getPromptsEndPoint: any = process.env.HOST + "/prompt/get_prompt?prompt_name="+scrubPrompt+"&prompt_type="+params.type
 
const prompt =  await fetch(getPromptsEndPoint, {
    headers: {
      "Authorization": 'Basic ' + btoa(auth),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then((resp) => {
   
    return resp.json()
  }).catch((error) => {
    console.log("error: " + error)
  })

  
return Response.json(prompt.message);
  
})