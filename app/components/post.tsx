'use client';

import { link } from "fs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Search from "./search";


interface PostList {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    count: number;
}
export default function Post(){

    const [posts, setPosts] = useState<PostList[]>([]);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
   
    
    
    // const router = useRouter();
    // console.log(router.query)

    useEffect(()=>{
        const fetchData  = async () =>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`);
            // post 데이터 값을 들고온다.
            const data = await res.json();
            setPosts(data.result);
            setTotalCnt(data.totalCnt)
            console.log(data);
            
        }
        fetchData();
    }, [page]) 
   
   const lastPage = Math.ceil(totalCnt / 15);
   const totalPageCnt = 5;
   const startPage = Math.floor((page - 1) / totalPageCnt) * totalPageCnt + 1;
   const endPage = Math.min(lastPage, startPage + totalPageCnt -1 );
   const nextPage = () =>{
    const nextStart = Math.ceil((page + 1) / 5) * 5 + 1;
    setPage(nextStart)
   }
   const prevPage = () =>{
    const prevStart = Math.floor((page - 1) / 5) * 5 - 4;
    setPage(prevStart)
   }
//   페이지 네이션 국룰 코드;
    
return(
        <>
       <div className="mx-auto max-w-7xl p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">게시판</h1>
            <Link href="/write" className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">글쓰기</Link>
        </div>
        <div className="bg-white shadow-md rounded-lg">
            <div className="min-w-full">
                <ul className="bg-gray-100 flex justify-between">
                    <li className="px-6 py-3 text-center basis-2/12">번호</li>
                    <li className="px-6 py-3 text-center basis-6/12">제목</li>
                    <li className="px-6 py-3 text-center basis-2/12">작성자</li>
                    <li className="px-6 py-3 text-center basis-2/12">작성일</li>
                </ul>
                {
            posts && posts.map((e,i)=>{
                const date = new Date (e.date);
                date.setTime(date.getTime()+(60*60*9*1000))
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().
                padStart(2, '0');
                const day = date.getDate(). toString(). padStart(2, '0')
                const formatDate = `${year}-${month}-${day}`
               
                return(
                   <ul key={i} className="flex justify-between">
                    {/* e.id 를 안쓰는이유 2번을 삭제하면 1 3456으로 진행 되어버림 */}
                    <li className="px-6 py-3 text-center basis-2/12">{posts.length - i}</li>  
                    <li className="px-6 py-3 text-center basis-6/12 cursor-pointer">
                    <Link href={`/post/${e.id}`}>
                            <li>{e.title}</li>
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
       
        <div className="flex justify-center gap-x-5">
        {page > 5 && <button className="bg-white border px-1.5 py-1 rounded text-sm mb-20" onClick={()=>{setPage(page - 5)}}>이전</button>}
        {
            Array(lastPage - startPage + 1).fill(null).map((_,i)=>{
               
                const pageNumber = i + startPage;
               
                return (
                <>
                <button key={pageNumber} onClick={()=>{setPage(pageNumber)}} className={`${page === pageNumber ? "bg-orange-500 text-black" : "bg-slate-500 text-white"}'border px-1.5 py-1 rounded text-sm basis-8`}>{pageNumber}</button>
                </>
            )})
        }
        {page < lastPage && <button className="border px-1.5 py-1 rounded text-sm mb-20" onClick={()=>{setPage(page + 5)}}>다음</button>}
        </div>
       
        
        </>
    )
}