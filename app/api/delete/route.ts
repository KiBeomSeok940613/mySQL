import { NextRequest, NextResponse } from "next/server";
import db from '@/db'

interface PostNumber {
    id: number;

}

export const POST = async (
    req: NextRequest,
   
) : Promise<NextResponse> =>{

    if(req.method === 'POST'){
        try{
            const {id}: PostNumber = JSON.parse(await req.text());

            if(!id ){
                return NextResponse.json({message: "데이터가 부족함"});
                           
                // 예외처리를 반대로 할때 많음 정상적인 데이터를 받을때 먼저 처리
            }else{
                await db.query(
                    'delete from new_schema.board where id = ?',[id]
                    
                )    ;     
                return NextResponse.json({message: "정상 삭제",});
                // select - 선택
                // insert - 입력
                // delete - 삭제
                // update - 수정
            }

            // console.log(id);
        }catch(error){
           return NextResponse.json({error: "에러"}); 
        }
    }else{
        return NextResponse.json({error: "정상적인 데이터가 아닙니다."});
    }
    return NextResponse.json({message: "성공"})
    
}