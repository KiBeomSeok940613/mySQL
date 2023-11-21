
import { NextRequest, NextResponse } from "next/server";


export const GET = async(req: NextRequest) :
Promise<NextResponse> =>{
    const ip = req.headers.get('x-forwarded-for')
    if(req.method === 'GET'){
        console.log(ip)
        
        return NextResponse.json({data: ip})
    
    }else{
        return NextResponse.json({error: "에러가 발생하였습니다."})
    }
}