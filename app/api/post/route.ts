import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

import { RowDataPacket } from 'mysql2/promise';
import { error } from 'console';



export const GET = async (
    req: NextRequest,
    res: NextResponse
 )  :Promise<NextResponse> => {

    if(req.method === "GET"){

        console.log(req.nextUrl.searchParams.get("page"));
        const page = Number(req.nextUrl.searchParams.get("page") || 1);
        // 1보다 작으면 안됌
        const perPage = 15;
        const offset = (page - 1 ) * perPage;
        try{
            const [result] = await db.query<RowDataPacket[]>('SELECT * FROM sakila.payment order by payment_date limit ? offset ? ', [perPage, offset]);
            // ? 매개변수를 입력 값이 없어도 가능 뒤에 배열 값을 입력하면 차례대로 출력
            // 변수 값이 변하는 것을 넣어야함 []
            // 페이지 네이션 을 변수 정해 가지고 온 다음 뿌리는것.
            const [countResult] = await db.query<RowDataPacket[]>
            // open api 의 총 갯수를 출력 할때.
            ('select count(*) as cnt from sakila.payment')
            const totalCnt = countResult[0].cnt
            console.log(result)
            
            // 테이블 데이터를 받을때 2차 배열로 받기 때문에 [] 대괄호를 사용한다. 
            

            return NextResponse.json({message: "성공", result, totalCnt, page, perPage})

        }catch{
            return NextResponse.json({error : error})
        }
    }


    

    return NextResponse.json({error : "에러가 발생하였습니다."})
    }
