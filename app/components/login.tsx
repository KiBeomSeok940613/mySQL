


interface userInfo{
    user:{
      name: string;
      email?: string;
      image? : string;
      level?: number;
    }
  }
  

interface PropsData {
    session?: userInfo | null
}

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { signIn, signOut } from 'next-auth/react';

// import { useCustomSession } from '../sessions';


export default async function Login(){
    const session = await getServerSession(authOptions) as userInfo;
   
    const rediretTo = () =>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href= "/login"
    }
    return(
        <>
        {
            
           session && session.user
          ?
          <>
          <p className='w-full h-20 items-center flex justify-center bg-green-300 mb-5'>{session &&  session.user?.name}님 반갑습니다.</p>
          <Link className="bg-green-300 text-black font-bold px-4 py-2 rounded shadow-md hover:bg-orange-600 mb-5 " href='/logout'>로그아웃</Link>
          
            </>
            :
            <>
            <Link href='/login' className='font-bold border p-4 rounded-md'>로그인</Link>
            <Link href='/register' className='font-bold border p-4 rounded-md'>회원가입</Link>      
            </>
        
        }
    
        <div className="w-full flex justify-around ">         
        
        {session ? <button></button>:<>  
         <button className='font-bold border p-4 rounded-md '>게시판</button> 
         </>} 
        
        </div>         
        
        
        </>
    )
}