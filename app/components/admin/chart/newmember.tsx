

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface userType{
  id: number;
  email:string;
  name:string;
  nickname?:string;
  level:number;
  date:string;
}

export default function NewMember(){
  const [userData, setUserData] = useState<userType[]>()
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await fetch('http://localhost:3000/api/admin',{
        cache:'no-cache',
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          pathUrl:'mainNewMember'
          })
        })  
        const data = await res.json();
        setUserData(data.data)
        } catch (error) {
          alert(error)
        }
        }
        fetchData()
      },[])
  return(
    <>
    <div className="widget basis-full md:basis-[49.3%]">
      <div className="font-bold p-5 py-3 flex justify-between items-center">
        <h3>신규가입 회원 {userData && userData.length}명</h3>
        <Link href="./admin/member/" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-5 py-2.5'>회원전체</Link>
      </div>
      <div className="w-full">
        <ul className='flex py-4 text-sm justify-between border-b bg-[#f6f9fc]'>
          <li className="basis-[23%] text-[#6f809a] font-bold text-center text-xs sm:text-sm">아이디</li>
          <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">이름</li>
          <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">닉네임</li>
          <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">가입일</li>
        </ul>
        {
          userData && userData.map((e,i)=>{
            const date = new Date(e.date);  
            const hour = (date.getHours()+9).toString().padStart(2,'0');
            const minutes = date.getMinutes().toString().padStart(2,'0');
            const seconds = date.getSeconds().toString().padStart(2,'0');
            const formatDate = `${hour}:${minutes}:${seconds}`
            return(
              <ul key={i} className="flex justify-between border-b last:border-0 items-center">
                <li className="basis-[23%] py-2.5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">{e.email}</li>
                <li className="basis-1/5 py-2.5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">{e.name}</li>
                <li className="basis-1/5 py-2.5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">{e.nickname}</li>
                <li className="basis-1/5 py-2.5 text-[#6f809a] font-bold text-center text-xs sm:text-sm">{formatDate}</li>
              </ul>
            )
          })
        }
      </div>
    </div>
    </>
  )
}