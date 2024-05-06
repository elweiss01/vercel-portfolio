import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const POST =  withApiAuthRequired(async function CreateUsers(request: Request) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const createUsersEndPoint: any = process.env.HOST + "/admin/create_user"
  
  try {
    const result =  await request.json();
  
    const createUser = await fetch(createUsersEndPoint,{
        method:'POST',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(result)
    })

    const response = await createUser.json();

    return Response.json({ message: "OK", response }, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json({ message: "Error", error }, { status: 500 });
  }
})

export const revalidate = 0;