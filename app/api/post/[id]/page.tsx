'use client'

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

interface PostList {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    count: number;
}

export default function Detail(){
    const params = useParams();
    const [post, setPost] = useState<PostList[]>([])
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
        }
        fetchData()
    }, [params.id])

    return(
        <>
            {
            post.length > 0 ? (

            
                <p>제목 : {post && post[0]?.title}</p>
            ) : "데이터 로딩중"
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
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(30 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(60 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(90 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(120 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(150 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(180 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(210 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(240 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(270 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(300 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                </rect>
              </g>
              <g transform="rotate(330 50 50)">
                <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill={`#ff00ff`}>
                  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                </rect>
              </g>
            </svg>
          </div>
        </div>
        )
}