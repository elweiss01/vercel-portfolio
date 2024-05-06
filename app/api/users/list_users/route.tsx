import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const GET =  withApiAuthRequired( async function ListUsers() {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const listUsersEndpoint: any = process.env.HOST + "/admin/list_users"

  const listUsers = await fetch(listUsersEndpoint, {
    headers: {
      "Authorization": 'Basic ' + btoa(auth),
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
 
  const response = await listUsers.json();

  const cleanResponse = response.message.filter((item:any) => item.username !== process.env.USER);
 
   return Response.json(cleanResponse);
  
})

export const revalidate = 0;