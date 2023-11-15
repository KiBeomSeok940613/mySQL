import { NextRequest, NextResponse } from "next/server";
import db from '@/db'

interface PostData {
    userid: string;
    username: string;
    title: string;
    content: string;
   
}

export const POST = async (
    req: NextRequest,
   
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            const {userid, username, title, content}: PostData = JSON.parse(await req.text());

            if(!username || !userid || !title || !content){
                return NextResponse.json({message: "데이터가 부족함"});
                           
                // 예외처리를 반대로 할때 많음 정상적인 데이터를 받을때 먼저 처리
            }else{
                const [results] = await db.query(
                    'insert into new_schema.board (userid, username, title, content) value(?, ?, ?, ?)',[userid, username, title, content]
                    
                )         
                return NextResponse.json({message: "성공", results: results});
                // select - 선택
                // insert - 입력
                // delete - 삭제
                // update - 수정
            }

            console.log(name, title, content);

            return NextResponse.json({message: "성공"});

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