import nextAuth from "next-auth";
import Github from "next-auth/providers/github";
import KaKaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';
import db from '@/db'
import { RowDataPacket } from "mysql2";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

interface User {
    id:string;
    name: string;
    email: string;
    level: string;
}
interface CustomSession extends Session{
    user?: User
}

export const authOptions : any = {
    providers :[
       Github ({
        
            clientId : `${process.env.GITGUB_ID}`,
            clientSecret: `${process.env.GITGUB_ID}`
        }),
        KaKaoProvider({
            clientId: `${process.env.KAKAO_ID}`,
            clientSecret:
            `${process.env.KAKAO_PW}`
        }),
        NaverProvider({
            clientId: `${process.env.NAVER_ID}`,
            clientSecret:
            `${process.env.KAKAO_PW}`
        }),
        GoogleProvider({
            clientId: `${process.env.GOOGLE_ID}`,
            clientSecret:
            `${process.env.GOOGLE_PW}`
        }),
        CredentialsProvider({
            // 이메일 과 패스워드 값만 주면 해준당.
            name: 'Credentials',
            credentials : {
                email : {label : "email", type: "text"},
                password: {label : "password", type: "password"}

            },
            // 로그인 요청시 실행 되는 코드 디비와 비교 이후 맞으면 return user 정보를 보내고 틀리면 return null
            async authorize(credentials) :Promise<User | null>{

                try{
                    const [results] = await db.query<RowDataPacket[]>('select * from new_schema.login_schema where email = ?', [credentials?.email]);
                const userResult = results[0];
                if(!credentials  || !credentials.email || !credentials.password){  
                    return null
                    
                }
                const pwCheck = await bcrypt.compare(
                    
                    credentials.password, userResult?.password);

                
                if(!pwCheck){
                    console.log({message: "비밀번호 에러"});
                    return null
                }
                const user:User = {
                    id : userResult.id,
                    name: userResult.name,
                    email: userResult.email,
                    level: userResult.level,
                }
                return user;

                }catch(error){
                    return null
                }
                
            

            }
        })
        
    ],
    // 원하는 스타일로 로그인 페이지 만드는법
    // page : {
        // signIn : '/login
    // }

    session : {
        strategy : "jwt",
        maxAge: 24 * 60 * 60
    },
    // jwt 만들 때 실행되는 코드 토큰 발급
    callbacks :{
        jwt: async ({token, user} : {token:JWT , user?:User}) =>{
            if(user){
               token.user = {
                name : user.name,
                email : user.email,
                level : user.level,
            };
         }
            return token
        },
        // 유저 세션이 조회될 때마다 실행되는 코드
        session : async ({session, token} : {session: CustomSession, token : JWT}) =>{
            session.user = token.user as User
            return session
        }
    },
    
    secret: `${process.env.SECRET}`,
    // jwt 생성시 필요한 암호. 원래는 해킹이 불가능 하게 어렵게 작성 해야함.


}

const handler = nextAuth(authOptions);
export {handler as GET, handler as POST}
