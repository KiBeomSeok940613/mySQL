'use Client'
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import Link from "next/link";
import { useState } from "react";

interface formType {
  name: string;
  title: string;
  content: string;
}

interface editProps {
  params: {
    id: string;
  };
}

export default async function Edit(props: editProps) {
  let editChange: (e: React.FormEvent) => Promise<void>;
  const [results] = await db.query<RowDataPacket[]>(
    "SELECT * from new_schema.board where id = ?",
    [props.params.id]
  );

  if (results.length > 0){ 
    const editChange = async (e) =>{
      e.preventDefault();
      const name = e.target.name.value;
      const title = e.target.title.value;
      const content = e.target.content.value;

      await db.query(
        'update new_schema.board set title= ? , content=? where id = ? ' , [title, content, name, props.params.id]

      );
      window.location.href = '/';
    
      

    }

  }
  console.log(results[0].content);
  
  

  // const post = results[0];

  // const {name, title, content} = parseForm();

  // await db.query('UPDATE * new_schema.board SET name = ?, title = ?where id = ?',[name, title, content,])

  // date 하면 날짜 id 하면 id author = 이름  출력할땐 defaultvalue ,onchange
  // 'udate 테이블명 set 필드 = 변경값, 필드 = 변경값, 필드 = 변경값 where id =  변경할 아이디'
  // update new_schema.board set title= ? , content=? where id = ? ' , [title, content, id]

  return (
    <>
      {results.length > 0 ? (
        <form method="post" onSubmit={editChange}>
          <input
            className="shadow text-gray-700 text-sm mb-2 border"
            type="text"
            name="name"
          ></input>
          <input
            className="shadow text-gray-700 text-sm mb-2 border"
            type="text"
            name="title"
          ></input>
          <textarea
            className="border shadow text-gray-600 mt-20 px-2 "
            name="content"
          ></textarea>
          <Link
            href="/"
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none inline-block"
          >
            취소
          </Link>
          <Link href={`/`}>
            <button type='submit' className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none">
              수정하기
            </button>
          </Link>
        </form>
      ) : (
        <NotData />
      )}
    </>
    // 지역변수 컴포넌트가 밖에 있어서 안에 컴포넌트 끼리 사용 할 수가 없음.
  );
}
function parseForm(): formType {
  return { name: "parsename", title: "parsetitle", content: "parsecontent" };
}

function NotData() {
  return (
    <>
      <p>데이터가 존재 하지 않습니다.</p>
      <Link href="/">목록</Link>
    </>
  );
}

// editer 는 SSR 로 만들것 이기 때문에 use client 를 사용 할 수 없다 (effect, state 사용x)
