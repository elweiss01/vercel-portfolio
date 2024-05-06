import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const DELETE = withApiAuthRequired(async function DeleteUsers(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const deleteUsersEndpoint: any = process.env.HOST + "/admin/delete_user?username="
  
  try {
    const result =  await request.json();
   
    const deleteUser = await fetch(deleteUsersEndpoint+result,{
        method:'DELETE',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    const response = await deleteUser.json();
    
    return Response.json({ message: "OK", response }, { status: 200 });
    
  } catch (error) {
    console.log(error)
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})