"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";


interface formType {
  userid: string;
  username: string;
  title: string;
  content: string;
}

export default function Write() {
  const { data: session } = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    // 반응이 느릴뿐이지 데이터는 정상적으로 들어간다.
    userid: session?.user?.email ?? "",
    username: session?.user?.name ?? "",

    title: "",
    content: "",
  });
  useEffect (()=>{
    setFormData({
        userid: session?.user.email ?? '',
        username: session?.user.name ?? '',
        title: '',
        content: '',
    })
  }, [Session?.user.name, session?.user.email])

  const changeEvent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        alert("정상적으로 등록 하였습니다.");
        window.location.href = "/";
      } else {
        const errorData = await res.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form method="post" onSubmit={submitEvent}>
        <input
          onChange={changeEvent}
          className="shadow text-gray-700 text-sm mb-2 border"
          type="text"
          name="name"
          defaultValue={session && session.user.name}
        ></input>
        <input
          onChange={changeEvent}
          className="shadow text-gray-700 text-sm mb-2 border"
          type="text"
          name="title"
          defaultValue={formData.title}
        ></input>
        <textarea
          className="border shadow text-gray-600 mt-20 px-2 "
          name="content"
          onChange={changeEvent}
          defaultValue={formData.content}
        ></textarea>
        <Link
          href="/"
          className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 focus:outline-none inline-block"
        >
          취소
        </Link>
        <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none">
          등록
        </button>
      </form>
    </>
  );
}
