


interface userInfo{
    user:{
      name: string;
      email?: string;
      image? : string;
      level?: number;
    }
  }
  

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Logout from './logout';
import Login from './login';


// import { useCustomSession } from '../sessions';


export default async function Nav(){
    const session = await getServerSession(authOptions) as userInfo;
   
    
    return(
        <>
        {
            
           session && session.user
          ?
          <>
          <p className='w-full h-20 items-center flex justify-center bg-green-300 mb-5'>{session &&  session.user?.name}님 반갑습니다.</p>
                <Logout />
          
            </>
            :
            <>
            <Login />
            <Link href='/register' className='font-bold border p-4 rounded-md'>회원가입</Link>      
            <Link href='/' className='font-bold border p-4 rounded-md'>게시판</Link>      
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