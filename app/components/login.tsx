'use client'


interface userInfo{
    name: string;
    email: string;
    image: string;   
}

interface PropsData {
    session?: userInfo | null
}

import {signIn, signOut} from 'next-auth/react';
import Link from 'next/link';
import { useCustomSession } from '../sessions';


export default function Login(){
    const {data: session, status} = useCustomSession();
    console.log(session)
    const rediretTo = () =>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href= "/login"
    }
    return(
        <>
        {
            
          status !== 'loading' &&  session && session.user?.name
          ?
          <>
          <p>{session &&  session.user?.name}님 반갑습니다.</p>
          <button onClick={()=>{signOut()}}>로그아웃</button>
        
        </>
        :
        <>
    
        <div className="w-full flex justify-around ">         
        <button onClick={()=>{rediretTo()}}>로그인</button>
         <Link href='/register'>회원가입</Link>
         <Link href='/'>게시판</Link>
        </div>
         
        </>
        } 
        </>
    )
}