"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col  bg-gray-500/10 ">
      <div className="mt-5 ">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
        <button
          className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
          onClick={() => signIn("google")}
        >
          <Image
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            width={300}
            height={300}
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
