
import db from '@/db'
import { RowDataPacket } from 'mysql2'
import Link from 'next/link';
import React from 'react';


export default async function SearchResult({
    
    params
} : {
    params?: {keyword?: string}
}){
    const keywords = params?. keyword !== undefined ? params?.keyword : "";
    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM  new_schema.board where title Like ?' , [`%${decodeURIComponent(keywords)}%`])
           
    return(
       
        <div className="">
            <p>검색 결과 :{decodeURIComponent(keywords)}</p>
            {results.length === 0 && <p>검색결과 가 없습니다.</p>}
            {
                results && results.length > 0 && results.map((e,i)=>{
                    return(
                        <div key={i}>
                        <Link href={`/post/${e.id}`}>
                        <p>{e.title}</p>
                        <p>{e.userId}</p>
                        </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}