
import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function GET(request:Request, {params}:any) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const getUsers: any = process.env.HOST + "/admin/get_user?username="+params.username

  let payload = []
  payload.push({"username":params.username})
 
  const user = await fetch(getUsers, {
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

return Response.json(user.message);
  
})