"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sider from "@/components/Sider";
import Header from "@/components/Header";
import Body from "@/components/Body";

export default function Home() {
  const [userInfo, setUserInfo] = useState({ nickname: "" });
  const router = useRouter();

  useEffect(() => {
    // 校验是否登录，未登录则跳转到登录页
    const userInfoStr = localStorage.getItem("userInfo");
    if (!userInfoStr) {
      router.replace("/login");
      return;
    }
    // 保存用户信息到state
    const userInfo = JSON.parse(userInfoStr as string);
    setUserInfo(userInfo);
  }, []);
  return (
    <div className="relative flex h-screen w-full flex-row overflow-hidden">
      <div className="bg-white z-[21] w-[260px] flex-shrink-0 overflow-x-hidden bg-token-sidebar-surface-primary max-md:!w-0">
        <Sider></Sider>
      </div>
      <div className="bg-white relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Header nickname={userInfo.nickname}></Header>
        <Body></Body>
      </div>
    </div>
  );
}
