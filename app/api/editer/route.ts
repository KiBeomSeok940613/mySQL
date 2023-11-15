import { NextRequest, NextResponse } from "next/server";
import db from '@/db'

interface PostData {
    userid: string;
    username: string;
    title: string;
    content: string;
    id: string;
   
}

export const POST = async (
    req: NextRequest,
   
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            const {userid, username, title, content, id}: PostData = JSON.parse(await req.text());

            if(!username || !userid || !title || !content || !id){
                return NextResponse.json({message: "데이터가 부족함"});
                           
                // 예외처리를 반대로 할때 많음 정상적인 데이터를 받을때 먼저 처리
            }else{
                const [results] = await db.query(
                    'update set new_schema.board (userid, username, title, content, id) value(?, ?, ?, ?, ?)',[userid, username, title, content, id]
                    
                )         
                return NextResponse.json({message: "수정성공", results: results});
                
            }
     

        }catch(error){
           return NextResponse.json({error: "에러"}); 
        }
    }else{
        return NextResponse.json({error: "정상적인 데이터가 아닙니다."});
    }
    return(
        NextResponse.json({message: "성공"})
    )
}