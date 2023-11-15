'use client';

import { signIn } from "next-auth/react";

import { useState } from "react";



interface formType{
    email: string;
    password: string;
    name: string;
}

export default   function Register(){
    const [formData, setFormData] = useState<formType>({
        email : '',
        password : '',
        name : ''
    })
    const [message, setMessage] = useState<string>('');
    const changeEvent  = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
           
           
        
        
        })
        // 하단에 만들어둔 input 란에 name 이 이쪽으로 값을 받는다.
        console.log(FormData)
    }
    const submitEvent = async  (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            try{
                const res = await fetch('/api/auth/signup',{
                    method : 'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if(res.ok){
                    const data = await res.json()
                    const result = data.data
                    if(data.message === '성공'){
                        alert('회원 가입에 성공 하였습니다.')
                        // window.location.href='/'
                        console.log(data)
                    }
                    signIn('credentials', {
                        email : result. email,
                        password: result.password,
                        callbackUrl : '/'
                    })
                    console.log(data)
                    setMessage(data.message)
                }
                

            }catch(error){
                console.log(error)
            }
    }
    return(
        <>
        <p>{message}</p>
        <form onSubmit={submitEvent} method="POST">
            <input onChange={changeEvent} type="text" placeholder="이메일" name="email" required ></input>
            <input onChange={changeEvent} type="password" placeholder="비밀번호" name="password" required ></input>
            <input onChange={changeEvent} type="text" placeholder="이름" name="name" required ></input>
            <button type='submit'>확인</button>

        </form>
        </>
    )
}