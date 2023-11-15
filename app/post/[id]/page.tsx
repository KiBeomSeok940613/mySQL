'use client'

import Comment from "@/app/components/comment";
import { useCustomSession } from "@/app/sessions";
import Link from "next/link";
import { useParams } from "next/navigation"

import React, { useEffect, useState } from "react"




interface PostList {
    id: number;
    title: string;
    content: string;
    userid: string;
    username: string;
    date: string;
    count: number;
}

export default function Detail(){
  const {data: session} = useCustomSession();
    const params = useParams();
    const [post, setPost] = useState<PostList[]>([])
    const[isLoading, setIsLoading] = useState<boolean>(true);
    console.log(params)

    useEffect(()=>{
        const fetchData = async () => {
            // 배열의 마지막 값 을 가져오는법 pop
            const res = await fetch(`/api/post/${params.id}`);
            // post / 의 값을 받으려면 동적 라우터 페이지 가 필요함.
            // ex 강의실은 post 강의실 자체는 post/id page
            const data = await res.json();
            console.log(data);
            setPost(data.data);
            setIsLoading(false);
        }
        fetchData()
    }, [params.id])
  
    const deletePost = async (e: number) => {
      try{
        const res = await fetch('/api/delete' ,{
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({id: e})
        })
        if(res.ok){
            const data = await res.json();
            console.log(data.message);
            alert(data.message)
            window.location.href = '/';
        }else{
            const errorData = await res.json();
            console.log(errorData.error);
        }

    }catch(error){
        console.log(error);
    }
      
      // alert(e) > 현재 포스트 아이디 값.
    }
   

    return(
        <>
        {isLoading && <Loading/>}
            {
            post.length > 0 ? (

              <>
                <p>제목 : {post && post[0]?.title}</p>
                <p>내용 : {post && post[0]?.content}</p>
                {
                  session ? <Comment id={post && post[0]?.id} /> : <p className="block border p-4 text-center my 5 rounded-md"><Link href='/login'>로그인 이후 댓글을 작성 할 수 있습니다.</Link></p>
                }
                {
                  session && session.user && (
                    (post && post[0] && session.user.email === post[0].userid)|| session.user.level === 10
                  ) && 
                  <>
                
                <Link href={`/editer/${post[0]?.id}`}> <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none">수정</button></Link>
                <button className="bg-pink-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none" onClick={()=>{deletePost(post[0]?.id)}}>삭제</button>
          
                </>
                } 
               </>
            ) : null
            
          }
         
          
                 
                 {/* 제목을 클릭 했을때 주소가 id 값으로 이동 되게 하려먼 어떻게? 실제 id 값을 넘겨야 삭제하거나 수정 해도 문제 없이 가지고 올 수 있다. */}
       </>
    )
}

function Loading(){
    return(
    <div className="fixed w-full h-full bg-black/50 top-0 left-0 z-20">
          <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
            <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <g transform="rotate(0 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(30 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(60 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(90 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(120 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(150 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(180 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(210 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(240 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(270 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(300 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(330 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#f2a0f2`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
              </g>
            </svg>
          </div>
        </div>
        )
}