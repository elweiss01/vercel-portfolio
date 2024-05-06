import { NextRequest, NextResponse } from "next/server";
import { withApiAuthRequired} from '@auth0/nextjs-auth0';

export const dynamic = 'force-dynamic'; 
export const maxDuration = 300;
export const POST = withApiAuthRequired(async function PostInvoke(request: NextRequest) {
  const auth: any = process.env.USER_MAIN + ":" + process.env.PASSWORD
  const invokeEndPoint: any = process.env.HOST + "/query/invoke"
  
  try {
    const result =  await request.json();
   
    const parsebody = JSON.stringify(result)
    const invoke = await fetch(invokeEndPoint,{
        method:'POST',
        headers:{
            "Authorization": 'Basic ' + btoa(auth),
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: parsebody,
      
    })

    const response = await invoke.json();
    
    const query = response.message;
   
    return NextResponse.json({ message: "OK", query }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
})