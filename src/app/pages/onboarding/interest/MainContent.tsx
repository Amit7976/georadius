"use client";
import Link from "next/link";
import React, { useState } from "react";
import interestsList from "@/public/json/interestList.json";

function MainContent() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  // Categorizing interests
  const categorizedInterests = [
    {
      title: "Recommended",
      data: interestsList.filter((item) => item.recommendation),
    },
    {
      title: "All Topics",
      data: interestsList.filter((item) => !item.recommendation),
    },
  ];

  return (
    <>
      <div className="text-left px-4 pt-10 space-y-4">
        <h2 className="text-4xl font-bold">What interests you?</h2>
        <p className="text-2xl font-semibold text-gray-400">
          Select the topics you are{" "}
          <span className="text-green-600">interested</span> in.
        </p>
      </div>

      <div className="p-5">
        {categorizedInterests.map((section, index) => (
          <div key={index} className="w-full">
            <p className="text-2xl font-extrabold mt-10 mb-6 text-black">
              {section.title}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {section.data.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleInterest(item.name)}
                  className={`px-4 py-8 rounded-xl text-medium text-black ${
                    selectedInterests.includes(item.name)
                      ? "bg-green-300"
                      : "bg-gray-50"
                  }`}
                >
                  <p className="text-5xl mb-4">{item.icon}</p>
                  <p className="text-lg font-bold">{item.name}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 space-y-6">
        <button
          type="button"
          className="bg-green-600 active:bg-green-500 active:scale-95 w-full px-20 py-4 text-white text-xl font-extrabold rounded-full flex items-center justify-center gap-2"
        >
          Build my Feed
        </button>
        <div className="flex items-center justify-center">
          <Link href="#" className="text-black text-xl font-extrabold">
            Skip
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainContent;
