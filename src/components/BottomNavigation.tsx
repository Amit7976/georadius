"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { IoHomeOutline, IoHome, IoFlashOutline, IoFlash } from "react-icons/io5";
import { MdAddBox, MdOutlineAddBox } from "react-icons/md";
import { CgSearchLoading, CgSearch } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import HomePage from "@/src/app/page";
import RapidPage from "@/src/app/rapid/page";
import PostPage from "@/src/app/post/page";
import SearchPage from "@/src/app/search/page";
import ProfilePage from "@/src/app/[profile]/page";

const tabs = [
    { key: "home", name: "Home", icon: IoHomeOutline, icon2: IoHome, component: <HomePage /> },
    { key: "rapid", name: "Rapid", icon: IoFlashOutline, icon2: IoFlash, component: <RapidPage /> },
    { key: "post", name: "Post", icon: MdOutlineAddBox, icon2: MdAddBox, component: <PostPage /> },
    { key: "search", name: "Search", icon: CgSearch, icon2: CgSearchLoading, component: <SearchPage /> },
    { key: "profile", name: "Profile", icon: FaUser, icon2: FaUser, component: <ProfilePage /> },
];

export default function BottomNavigation() {
    const [activeTab, setActiveTab] = useState("home");
    const [isVisible, setIsVisible] = useState(true);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY === 0);
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col h-screen">
            {/* ✅ ShadCN Tabs for Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
                {tabs.map(({ key, component }) => (
                    <TabsContent key={key} value={key} className="h-full">
                        {component}
                    </TabsContent>
                ))}

                {/* ✅ Scroll Hide/Show Navigation Bar */}
                <TabsList className={`fixed bottom-0 w-full bg-white flex justify-around p-2 pt-0 rounded-none z-50 h-auto transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
                    {tabs.map(({ key, name, icon: Icon, icon2: Icon2 }) => (
                        <TabsTrigger key={key} value={key} className={`flex flex-col items-center flex-1 active:bg-gray-100 p-2 ${activeTab === key ? "border-t-[3px] border-green-500" : "border-t-1"}`}>
                            {activeTab === key ? <Icon2 size={24} className="text-green-600" /> : <Icon size={24} className="text-gray-400" />}
                            <span className={`text-xs font-bold mt-0.5 ${activeTab === key ? "text-green-600" : "text-gray-400"}`}>
                                {name}
                            </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}
