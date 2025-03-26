import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";

function MainContent() {
  return (
    <div className="flex items-center justify-around flex-col space-y-4 h-[94.3vh]">
      <Image
        src={"/gif/notification.gif"}
        alt="On Boarding Get Started"
        width={200}
        height={200}
        className="w-full h-96 object-contain"
      />

      <div>{/* // EMPTY DIV ELEMENT FOR SPACING */}</div>
      <div className="flex items-center justify-center flex-col space-y-4 text-center bg-gray-50 px-10 pt-20 pb-14 rounded-t-[5rem] w-full bottom-0 absolute">
        <h1 className="text-3xl font-extrabold">Notification Permission</h1>
        <p className="text-xl font-semibold text-gray-600">
          We need your permission to send you notifications about breaking news
          or updates.
        </p>
        <button
          type="button"
          className="bg-green-600 active:bg-green-500 active:scale-95 px-20 py-4 mt-4 text-white text-xl font-bold rounded-md flex items-center justify-center gap-2"
        >
          Turn
          <FaRegBell className="text-2xl" />
          On
        </button>
        <div className="flex items-center justify-center">
          <Link href="#" className="text-black text-lg font-extrabold">
            Skip
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
