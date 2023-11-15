"use client"
 
  import { NextRequest, NextResponse } from "next/server";
  import { RowDataPacket } from "mysql2/promise";
  import Link from "next/link";
  import { useEffect, useState } from "react";
import { useCustomSession } from "@/app/sessions";
import { useParams } from "next/navigation";

  interface formType {
    userid: string;
    username: string;
    title: string;
    content: string;
    id: string;
  }

  interface editProps {
    params: {
      id: string;
    };
  }
  interface PostList {
    id: number;
    title: string;
    content: string;
    userid: string;
    username: string;
    date: string;
    count: number;
}

  export default  function Edit(props: editProps) {
    const { data: session } = useCustomSession();
    const [post, setPost] = useState<PostList[]>([])
    const params = useParams();
    const [formData, setFormData] = useState<formType>({
    
    userid: session?.user?.email ?? "",
    username: session?.user?.name ?? "",
    title: "",
    content: "",
    id : props.params.id,
  });
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
  useEffect (()=>{
    fetch(`/api/editer?id=${props.params.id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Update the formData state
      setFormData({
        userid: session?.user?.email ?? "",
        username: session?.user?.name ?? "",
        title: data.title ?? "",
        content: data.content ?? "",
        id : data.id ?? "",
      });
    })
    .catch(error => console.error(error));
}, [session?.user?.name, session?.user?.email, props.params.id]);
 
  const changeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/editer", {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });
      console.log(formData)
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        
        alert("정상적으로 수정 하였습니다.");
        window.location.href = "/";
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
    // let editChange: (e: React.FormEvent) => Promise<void>;
    // const [results] = await db.query<RowDataPacket[]>(
    //   "SELECT * from new_schema.board where id = ?",
    //   [props.params.id]
    // );
    // const editChange = async (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.currentTarget)
    //   const name = formData.get('name');
    //   const title = formData.get('title');
    //   const content = formData.get('content');
    //   try {
    //     const res = await fetch("/api/editer",{
    //       method: ''
    //     })

    //   }
    

    // if (typeof name === 'string' && typeof title === 'string' && typeof content === 'string'){ 
    

    //     await db.query(
    //       'update new_schema.board set title= ?, content=? where id = ? ' , [title, content, props.params.id]

    //     );
    //     window.location.href = '/';
      
        

    //   }

    // }
    // console.log(results[0].content);
    
    

    // const post = results[0];

    // const {name, title, content} = parseForm();

    // await db.query('UPDATE * new_schema.board SET name = ?, title = ?where id = ?',[name, title, content,])

    // date 하면 날짜 id 하면 id author = 이름  출력할땐 defaultvalue ,onchange
    // 'udate 테이블명 set 필드 = 변경값, 필드 = 변경값, 필드 = 변경값 where id =  변경할 아이디'
    // update new_schema.board set title= ? , content=? where id = ? ' , [title, content, id]

    return (
      <>
      
          <form method="post" onSubmit={submitEvent}>
           
            <input 
              className=" m-5 w-full shadow text-gray-700 text-sm mb-2 border"
              type="text"
              name="username"
              defaultValue={post[0]?.username}
              readOnly
            ></input>
            <input 
             onChange={changeEvent}
              className=" m-5 w-full shadow text-gray-700 text-sm mb-2 border"
              type="text"
              name="title"
              defaultValue={post[0]?.title}
            ></input>
            <textarea
            onChange={changeEvent}
              className=" m-5 w-full border shadow text-gray-600 mt-20 px-2 "
              name="content"
              defaultValue={post[0]?.content}
            ></textarea>
            
            <Link href="/"
               className="bg-green-500 text-white m-10 px-5 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none inline-block"
           >        
              취소
              
            </Link>
            <Link href={`/`}>
              <button type='submit' className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none">
                수정하기
              </button>
            </Link>
          </form>
    
      </>
      // 지역변수 컴포넌트가 밖에 있어서 안에 컴포넌트 끼리 사용 할 수가 없음.
    );
  }
  // function parseForm(): formType {
  //   return { name: "parsename", title: "parsetitle", content: "parsecontent" };
  // }

  function NotData() {
    return (
      <>
        <p>데이터가 존재 하지 않습니다.</p>
        <Link href="/">목록</Link>
      </>
    );
  }

  