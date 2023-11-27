import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import Logout from '../components/logout';
import AdminNav from '../components/admin/navbar/adminnav';


interface userInfo{
    user:{
      name: string;
      email?: string;
      image? : string;
      level?: number;
    }
  }



export default async function DashboardLayout({
    children
} : {
    children:React.ReactNode
}) {
    let sessions = await getServerSession(authOptions) as userInfo;
        // if(!sessions &&  sessions || sessions?.user.level !== 10){
        //     // 10과 다르면 다른 기능이 뜨고 
        //     return(
                 
        //         <div className="min-h-[calc(100vh-58px)] flex items-center justify-center flex-wrap bg-[#f1f5f0]">
        //             <div className="widget p-4 text-center">
        //             <h3 className='mb-4 text-lg font-semibold'>관리자만 접속 가능한 페이지 입니다.</h3>
        //             {
        //                 sessions ? <Logout /> : <Link className='border' href='/login'>로그인</Link>
        //                 // 세션이 없으면 로그아웃이 뜨게 설정 한다.
        //             }
        //             </div>
        //         </div>
        //         )
            
        // }

    return(
        <div className="bg-[#f1f0f5] flex justify-between px-[4%] md:px-[2%]">
            {/* 네비 */}
            <AdminNav />
            <div className="md-pl-48 pt-8 w-full border-r">
                {children}
            </div>
        </div>
        
    )
}