"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

import Form from "./form";
import { query } from "@/api/gpt";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Body() {
  const [chatItems, setChatItems] = useState<Array<{ q: string; a: string }>>(
    []
  );
  const [isAlert, setIsAlert] = useState(false);
  const router = useRouter();

  // 发送问题
  const onAnswer = async (question: string) => {
    const userInfoJson = localStorage.getItem("userInfo");
    const userInfo: { nickname: string; OpenRouterAPIkey: string } =
      userInfoJson ? JSON.parse(userInfoJson) : null;
    let newChatItems = [...chatItems, { q: question, a: "" }];
    setChatItems(newChatItems);
    const answer = await query(newChatItems, userInfo);
    if (!answer) {
      // 未登录或者API key不正确
      setIsAlert(true);
      localStorage.removeItem("userInfo");
      setTimeout(() => {
        setIsAlert(false);
        router.replace("/login");
      }, 2000);
      return;
    }
    // 模拟打字效果
    let writedAnswer = "";
    let intervalId = setInterval(() => {
      if (writedAnswer.length < answer.length) {
        writedAnswer = answer.substr(0, writedAnswer.length + 3);
        setChatItems((state) => {
          state.forEach((a) => {
            if (a.q === question) {
              a.a = writedAnswer;
            }
          });
          return [...state];
        });
      } else {
        clearInterval(intervalId);
      }
    }, 20);
    console.log(chatItems);
  };
  return (
    <div className="pl-[120px] pr-[120px] flex h-full w-full flex-col text-base @lg/thread:justify-center @md/thread:max-w-3xl @lg/thread:max-w-[40rem] @xl/thread:max-w-[48rem] relative">
      {isAlert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          OpenRouterAPIkey is incorrect or not set. Please check your API key
        </Alert>
      )}
      <div
        className="h-full m-b flex-col text-token-text-primary [display:var(--display-hidden-until-loaded,flex)] mt-[var(--screen-optical-compact-offset-amount)] flex-shrink items-center justify-center overflow-hidden @lg/thread:hidden"
        style={{ opacity: "1", willChange: "auto" }}
      >
        {!chatItems ||
          (chatItems.length < 1 && (
            <div className="relative mb-[20px] inline-flex justify-center text-center text-2xl font-semibold leading-9">
              <h1>有什么可以帮忙的？</h1>
            </div>
          ))}

        <div className="h-[400px] overflow-y-auto">
          {chatItems.map((query, index) => (
            <div key={query.a} className="mb-[50px]">
              <div className="mb-[15px] text-[18px]">
                <div className="mb-[5px] font-[600]">
                  <span className={styles.avatar}>12333</span>
                  You
                </div>
                <div>{query.q}</div>
              </div>
              <div>
                <div className="mb-[5px] font-[600]">
                  <QuestionAnswerIcon color="success" className="mr-[10px]" />
                  ChatGPT
                </div>
                <div>{query.a}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-[20px]">
          <Form onAnswer={onAnswer}></Form>
        </div>
      </div>
      <div className="w-full px-2 py-2 text-center text-xs text-token-text-secondary">
        <div className="h-full min-h-4">
          <div>ChatGPT 也可能会犯错。请核查重要信息。</div>
        </div>
      </div>
    </div>
  );
}
