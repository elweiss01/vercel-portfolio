import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async function ModifyUsers(request: Request, {params}:any) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const modifyUsersEndpoint: any = process.env.HOST + "/admin/modify_user?username="

  const body = await request.json();

  try { 
        const updateUsers = await fetch(modifyUsersEndpoint+params.username,{
        method:'POST',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const response = await updateUsers.json();
   
    return Response.json({ message: "OK", response }, { status: 201 });
    
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})

export const revalidate = 0;

