import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt'
import { RowDataPacket } from "mysql2";

interface formType{
    email: string;
    password: string;
    name: string;
    phone : string;
}

export const POST = async (
    req: NextRequest  
) : Promise<NextResponse> => {
    if(req.method === 'POST'){

        const {email, password, name, phone}: formType = JSON.parse
        
        (await req.text());

        if(!email || !password ||!name ||!phone){
            NextResponse.json({message: '해당 이메일이 존재 합니다.'});
        }
        
        const hash = await bcrypt.hash(password,10)

        const [checkMember] = await db.query<RowDataPacket[]>(`select count(*) as cnt from New_schema.login_schema where email = ?`, [email]);
        const memberCnt = checkMember[0].cnt;
        if(memberCnt > 0){
            return NextResponse.json({message: '해당 이메일이 존재 합니다.'});
            
        }else{
            await db.query('insert into new_schema.login_schema (email, password, name, phone) values(?,?,?,?)',[email, hash, name, phone]);

            const data = {
                email : email,
                password : password,
            }
    
            
            return NextResponse.json({message: "성공",data: data});
        }

      
        console.log(hash)
        // 데이터를 form 으로 보내서 그것을 텍스트로 받아서 압에
        // req.text 텍스트로 문자를 받아서 JSON.parse 로 집어넣는다.? 맞나?
        // parse 가 뭘까? 물파스? 붙이는파스? 파스키탄 알빠노

        return NextResponse.json({message: "성공"})
    
    }else{
        return NextResponse.json({error: '실패'});
        }
    }


