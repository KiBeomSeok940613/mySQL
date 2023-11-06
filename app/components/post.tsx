'use client';

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Post(){

    const [posts, setPosts] = useState([]);
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(1);

   
    
    
    // const router = useRouter();
    // console.log(router.query)

    useEffect(()=>{
        const fetchData  = async () =>{
            if(!page) return;
            const res = await fetch(`/api/post?page=${page}`);
            const data = await res.json();
            setPosts(data.result);
            setTotalCnt(data.totalCnt)
            console.log(data);
        }
        fetchData();
    }, [page]) 
   
    const lastPage = Math.ceil(totalCnt / 15)
    const startPage = Math.max(1, page -2);
    const endPage = Math.min(lastPage, page + 2)
    return(
        <>
        {page > 1 && <button onClick={()=>{setPage(page - 1)}}>이전</button>}
        {
            Array(lastPage - startPage + 1).fill(null).map((_,i)=>{
                return (
                <>
                <button onClick={()=>{setPage(i+1)}}>{i+1}</button>
                </>
            )})
        }
        {page < lastPage && <button onClick={()=>{setPage(page + 1)}}>다음</button>}
        {
            posts && posts.map((e,i)=>{
                return(
                   <React.Fragment key={i}>
                    <p>현재페이지 : {page}</p>
                    <p>가격 : {e.amount}</p>           
                   </React.Fragment> 
                )
            })
        }
        
        </>
    )
}