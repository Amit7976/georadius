import Image from "next/image";
import React from "react";
import logo from "@/public/images/Logo.png";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

function MainContent() {
  return (
    <>
      <div className="p-2 bg-white flex flex-col items-center h-[94.3vh] rounded-b-3xl">
        <div className="flex flex-col items-center space-y-1 py-6">
          <Image src={logo} alt="Logo" className="w-[35vw] pb-10" />
          <h1 className="text-2xl font-bold text-black">Sign In Account</h1>
          <p className="text-base text-gray-600 font-medium mt-1.5">
            Enter your personal data to login your account.
          </p>
        </div>

        <div className="flex flex-col mt-5 text-center w-full px-10">
          <button
            type="button"
            className="bg-white text-black active:scale-95 duration-300 flex items-center justify-center w-full h-14 rounded-xl border-2 border-black gap-2 font-semibold"
          >
            <FcGoogle className="text-xl mb-0.5" />
            Sign Up with Google
          </button>
        </div>

        <div className="flex flex-col space-y-3 text-center mt-14 w-full">
          <div className="border-t-2 relative h-6 flex justify-center mb-6">
            <p className="text-sm text-gray-600 absolute -top-1/2 bg-white px-2">
              Or sign in with email
            </p>
          </div>

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
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-lg font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                className="border-2 border-gray-200 rounded-md h-16 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <div className="flex justify-between items-center gap-5 mt-2 px-2">
                <p>Must be at least 8 characters.</p>
                <Link
                  href="./forgot-password"
                  className="text-green-600 font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col space-y-6 text-center mt-12 w-full px-5">
          <button
            type="submit"
            className="bg-green-600 active:bg-green-500 active:scale-95 duration-300 text-white font-bold py-2 px-4 rounded-md my-5 w-full h-16"
          >
            Sign In
          </button>
          <p className="text-base text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link href="./signup" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default MainContent;
