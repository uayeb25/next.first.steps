'use client';

import "./globals.css";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import  HeaderApp from "@/components/HeaderApp";
import { usePathname } from 'next/navigation';
import { GetUserInfo } from "@/services/users";
import { EvaluateResponse } from "@/utils/requestEvaluator";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setIsLogin( pathname === '/login' );
    setIsSignUp( pathname === '/signup' );
  }, [pathname]);

  useEffect(() => {

    if (!isLogin && !isSignUp) {
      GetUserInfo().then((response) => {
        setUsername(response.firstname);
      }).catch((error) => {
        const e = EvaluateResponse(error);
        if (e !== "") {
          router.push(e);
        }
      });
    }

  }, [isLogin, isSignUp]);


  return (
    <html lang="en">
      <body className={inter.className}>

        { isLogin && (<HeaderApp
          username={""}
          mainAction={ { name: "Signup", href: "/signup" } }  
        />)}

        { isSignUp && (<HeaderApp
          username={""}
          mainAction={ { name: "Login", href: "/login" } }  
        />)}

        { !isLogin && !isSignUp && (<HeaderApp
          username={username}
        />)}

        {children}

      </body>
    </html>
  );

}
