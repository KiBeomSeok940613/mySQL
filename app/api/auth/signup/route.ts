import { NextRequest, NextResponse } from "next/server";
import db from '@/db';
import bcrypt from 'bcrypt'
import { RowDataPacket } from "mysql2";

interface formType{
    email: string;
    password: string;
    name: string;
    level ? :number;
    type ? : string;
    phone : string;
    id ? : number;
}

export const POST = async (
    req: NextRequest  
) : Promise<NextResponse> => {
    if(req.method === 'POST'){

        let {email, password, name, level, type, phone, id}: formType = JSON.parse(await req.text());
            level = level === undefined ? 2 : level;
        console.log(email, password, name, level, type, phone, id)
        if(type === 'edit'){
            const [chKMember] = await db.query<RowDataPacket[]>(
            'select password from New_schema.login_schema where email = ?',[email])
        
            if(password === chKMember[0].password){
                await db.query<RowDataPacket[]>('update New_schema.login_schema set email = ?, name = ?, level =? where id = ?',[email, name, level, id])
            }else{
                const hash = await bcrypt.hash(password, 10);
                await db.query<RowDataPacket[]>('update New_schema.login_schema set email = ?, password = ?, name = ?, level =? where id = ?',[email, hash, name, level, id])
            }
            return NextResponse.json({message: "성공", data:name})
            
        }
        

        if(!email || !password ||!name ||!phone){
            NextResponse.json({message: '해당 이메일이 존재 합니다.'});
        }
        
        const hash = await bcrypt.hash(password,10)

        const [checkMember] = await db.query<RowDataPacket[]>(`select count(*) as cnt from New_schema.login_schema where email = ?`, [email]);
        const memberCnt = checkMember[0].cnt;
        if(memberCnt > 0){
            return NextResponse.json({message: '해당 이메일이 존재 합니다.'});
            
        }else{
            await db.query('insert into new_schema.login_schema (email, password, name, phone, level) values(?,?,?,?,?)',[email, hash, name, phone, level]);

            const data = {
                email : email,
                name: name,
                password : password,
            }
    
            
            return NextResponse.json({message: "성공",data: data});
        }

    
        // 데이터를 form 으로 보내서 그것을 텍스트로 받아서 압에
        // req.text 텍스트로 문자를 받아서 JSON.parse 로 집어넣는다.? 맞나?
        // parse 가 뭘까? 물파스? 붙이는파스? 파스키탄 알빠노

   
    
    }else{
        return NextResponse.json({error: '실패'});
        }
    }


