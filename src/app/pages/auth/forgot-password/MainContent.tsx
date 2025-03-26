import Image from "next/image";
import React from "react";
import logo from "@/public/images/Logo.png";
import Link from "next/link";

function MainContent() {
  return (
    <>
      <div className="p-5 bg-white flex flex-col items-center justify-center h-[94.3vh] rounded-b-3xl">
        <div className="space-y-1 py-6">
          <h1 className="text-3xl font-bold text-black">Forget Password</h1>
          <p className="text-lg text-gray-600 font-medium mt-1.5">
            Enter your email associated with your account. We will send you a
            temporary password.
          </p>
        </div>

        <div className="flex flex-col space-y-3 text-center mt-5 w-full">
          <form className="flex flex-col space-y-6 w-full px-2 text-left">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>

              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Email"
                className="border-2 border-gray-200 rounded-md h-16 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </form>
        </div>

        <div className="flex flex-col text-center mt-5 w-full px-5">
          <button
            type="submit"
            className="bg-green-600 active:bg-green-500 active:scale-95 duration-300 text-white font-bold py-2 px-4 rounded-md my-5 w-full h-16"
          >
            Send Temporary Password
          </button>
          <p className="text-base text-gray-600 font-medium mt-5">
            You know your password?{" "}
            <Link href="./signin" className="text-green-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default MainContent;
