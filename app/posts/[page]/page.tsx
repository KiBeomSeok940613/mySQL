import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Search from '@/app/components/search';

interface userInfo{
  user:{
    name: string;
    email?: string;
    image? : string;
    level?: number;
  }
}



export default async function PostList({
    params,
}: {params?: {page ?: number}
}) {
    console.log(params)
        
    const currentPage = params?.page !== undefined ?  params.page : 1;
    // 현제 파라미터가 값이 없다면 1페이지가 되고 그게 아니라면 해당 페이지로 접속.   
        const perPage = 7;
        const offset = (currentPage - 1 ) * perPage;
      
            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM  new_schema.board order by date DESC limit ? offset ? ', [perPage, offset]);
           
            const [countResult] = await db.query<RowDataPacket[]>
            
            ('select count(*) as cnt from  new_schema.board')
            const totalCnt = countResult[0].cnt

            const lastPage = Math.ceil(totalCnt / perPage);
            const TotalPageCnt = 5;
            const StartPage = Math.floor((currentPage - 1) / totalCnt) * TotalPageCnt + 1
            const endPage =  Math.min(lastPage, StartPage + TotalPageCnt - 1);

            let prevStart = Math.floor((currentPage - 1) / 5) * 5 - 4 ;
            let NextStart = Math.ceil((currentPage) / 5) * 5 + 1
           

            let sessions = await getServerSession(authOptions) as userInfo;
            console.log(sessions)

            
            
          
  return (
    <>
    <div className="mx-auto max-w-7xl p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold bg-green-300 border px-4 rounded shadow-md">게시판</h1>
            {
              sessions &&
              <Link href="/write" className="bg-green-300 text-black font-bold px-4 py-2 rounded shadow-md hover:bg-orange-600">글쓰기</Link>
            }
           
        </div>
        <div className="bg-white shadow-md rounded-lg">
            <div className="min-w-full">
                <ul className="bg-gray-100 flex justify-between">
                    <li className="px-6 py-3 text-center basis-2/12 border-r-2 bg-cyan-300">번호</li>
                    <li className="px-6 py-3 text-center basis-6/12">제목</li>
                    <li className="px-6 py-3 text-center basis-2/12 border-r-2 bg-cyan-300">작성자</li>
                    <li className="px-6 py-3 text-center basis-2/12">작성일</li>
                </ul>
                {
            results && results.map((e,i)=>{
                const date = new Date (e.date);
                date.setTime(date.getTime()+(60*60*9*1000))
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().
                padStart(2, '0');
                const day = date.getDate(). toString(). padStart(2, '0')
                const formatDate = `${year}-${month}-${day}`
                const number = totalCnt - ((currentPage - 1) * perPage + i);
                return(
                   <ul key={i} className="flex justify-between ">
                    {/* e.id 를 안쓰는이유 2번을 삭제하면 1 3456으로 진행 되어버림 */}
                    <li className="px-6 py-3 text-center basis-2/12 ">{results.length - i}</li>  
                    <li className="px-6 py-3 text-center basis-6/12 cursor-pointer border-b-orange-500">
                    <Link href={`/post/${e.id}`}>
                            {e.title}
                        </Link>
                    </li>
                    <li className="px-6 py-3 text-center basis-2/12">{e.author}</li>           
                    <li className="px-6 py-3 text-center basis-2/12">{formatDate}</li>           
                             
                   </ul> 
                )
            })
        }
            </div>
        </div>
       </div>
       <div className="flex justify-center gap-x-5 mb-5">
        {
            currentPage > 5 && <Link href={`/posts/${prevStart}`}
            className='bg-white border px-1.5 py-1 text-sm rounded'>이전</Link>
        }
        {
            Array(endPage - StartPage + 1).fill(null).map((_, i)=>{
                const pageNumber = i + StartPage;
                return(
                    <Link key={i} href={`/posts/${pageNumber}`}
                    className='bg-white border px-1.5 py-1 text-sm rounded'>{pageNumber}</Link>
                )
            })
        }
        {
            NextStart <= lastPage && <Link href={`/posts/${NextStart}`}
            className='bg-white border px-1.5 py-1 text-sm rounded'>다음
            </Link>
        }
       </div>
       <Search />
    </>
 
   
  )
}
