"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MainContent() {
  const router = useRouter();
  const [locationStatus, setLocationStatus] = useState<string>("Click Allow to get location");
  const [permissionState, setPermissionState] = useState<string>("checking...");

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionState(result.state);

        if (result.state === "granted") {
          router.replace("/");
        }

        result.onchange = () => {
          setPermissionState(result.state);
          if (result.state === "granted") {
            router.replace("/");
          }
        };
      });
    } else {
      setPermissionState("not supported");
    }
  }, [router]);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus(`Lat: ${latitude.toFixed(2)}, Lng: ${longitude.toFixed(2)}`);
        console.log(`User Location: Lat ${latitude}, Lng ${longitude}`);
        router.replace("/"); // ✅ Redirect after getting location
      },
    );
  };

  return (
    <div className="flex items-center justify-around flex-col space-y-4 h-[94.3vh]">
      <Image
        src={"/gif/location.gif"}
        alt="On Boarding Get Started"
        width={200}
        height={200}
        className="w-full h-96 object-contain"
      />

      <div>{/* EMPTY DIV FOR SPACING */}</div>
      <div className="flex items-center justify-center flex-col space-y-4 text-center bg-gray-50 px-10 pt-20 pb-14 rounded-t-[5rem] w-full bottom-0 absolute">
        <h1 className="text-3xl font-extrabold">Location Permission</h1>
        <p className="text-xl font-semibold text-gray-600">
          We need your location to deliver the most accurate, real-time news on the go.
        </p>

        <button
          type="button"
          className="bg-green-600 active:bg-green-500 active:scale-95 px-20 py-4 mt-4 text-white text-xl font-bold rounded-md flex items-center justify-center gap-2"
          onClick={requestLocation}
        >
          Allow
          <FaLocationDot className="text-2xl" />
          Location
        </button>

        <p className="text-md font-semibold text-gray-700 mt-2">{locationStatus}</p>

        <div className="flex items-center justify-center">
          <Link href="/home" className="text-black text-lg font-extrabold">
            Skip
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
