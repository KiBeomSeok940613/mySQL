'use client';

export default function Login(){ 
  const rediretTo = () =>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href='/login';
    
  }
  return(
    <button onClick={rediretTo}>로그인</button>
  )

}