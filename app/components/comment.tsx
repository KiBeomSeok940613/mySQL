

/* 
const {data: session} = useCustomSession();
const data = {
    id: 5,
    name: "기범석",
    email : "abcd@naver.com",
}
변수 내에 중괄호 {} 가 들어가면 구조 분해 할당 {destructuring assigment } > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당 할 때 사용.

EX) ....data .id 이걸 변수로 지정을 따로 하고 싶다면 
const {id} = data > const id = 5 값이 저장된다.
data.id 로 사용 가능...
*/

 'use client';

import React, { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { useParams } from "next/navigation";

interface CommtentProps {
    id: number
}
interface formType {
    parentid: number;
    userid: string;
    username: string;
    content: string;
}
interface commentType {
    id : number;
    parentid : number;
    userid : string;
    content: string;
    date :  string;
}

export default function Comment(props: CommtentProps){
    const {id} = props;

    const {data: session } = useCustomSession();
    const [formData, setFormData] = useState<formType>({
            parentid : id,
            userid :  session?.user?.email ?? '',
            username : session?.user?.name ?? '',
            content : '',
    })
    useEffect(()=>{
        setFormData({
            parentid : id,
            userid :  session?.user?.email ?? '',
            username : session?.user?.name?? '',
            content: ''
        })
    }, [session?.user.name, session?.user.email, id])

    const [totalComment, setTotalComment] = useState<commentType[]>();
    const commentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setComment(e.target.value);
        setFormData({...formData, [e.target.name] : e.target.value});
        console.log(formData)
        // 댓글 내용을 저장.setComment 에서 받아오  
    }

    const params = useParams()
    console.log(params)
    useEffect(()=>{
        const fetchdata = async ()=>{
            const res = await fetch(`/api/comment?id=${params.id}`)
            const data = await res.json();
            setTotalComment(data.result);
        }
        fetchdata();
    }, [params.id])
    
    const cmtSubmit = async ()=>{
        
        try{
            const res = await fetch('/api/comment', {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json();
                console.log(data)
                setTotalComment(data.result)
            }
        }catch(error){
            console.log(error);
        }
    }
   
    return(
        <>
        {
        session && session.user && 
        <>
            <p className='border p-4 border-green-300 max-w-7xl mx-auto flex flex-wrap px-[2%] font-bold justify-center'>댓글 목록</p>
            {
                totalComment && totalComment.map((e,i)=>{
                    const date = new Date (e.date);
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().
                    padStart(2, '0');
                    const day = date.getDate(). toString(). padStart(2, '0')
                    const hours = date.getHours(). toString(). padStart(2, '0')
                    const minutes = date.getMinutes(). toString(). padStart(2, '0')
                    const seconds = date.getSeconds(). toString(). padStart(2, '0')
                    const formatDate = `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`
                    return(
                        <>
                        <p className='border p-4 border-green-300 max-w-7xl mx-auto flex flex-wrap justify-between px-[2%]' key={i}>{e.content}{formatDate}</p>
                        
                        </>
                    )
                })
            }
            <input type="text" name='content' className="max-w-7xl mx-auto flex justify-center border p-2 border-orange-500 rounded" onChange={commentValue}></input>
            <button className= "max-w-7xl mx-auto flex justify-center border p-2 bg-cyan-300 font-bold text-zinc-600 border--500 rounded"onClick={cmtSubmit}>댓글 전송</button>
           
        </>
        }
        </>
        
    )
}