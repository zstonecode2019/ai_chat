"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function Form({
  onAnswer,
}: {
  onAnswer: (question: string) => void;
}) {
  const [question, setQuestion] = useState("what's one interesting city to visit in Japan?");
  const toAnswer = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!question) return;
    onAnswer(question);
    question && setQuestion("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-center empty:hidden"></div>
      <form
        className="w-full"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:r9e:"
        data-state="closed"
      >
        <div className="relative z-[1] flex h-full max-w-full flex-1 flex-col">
          <div className="group relative z-[1] flex w-full items-center">
            <div className="w-full">
              <div
                id="composer-background"
                className="flex w-full cursor-text flex-col rounded-3xl border border-token-border-light px-3 py-1 duration-150 ease-in-out contain-inline-size motion-safe:transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] dark:border-none dark:shadow-none shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] bg-token-main-surface-primary dark:bg-[#303030]"
              >
                <div
                  className="flex flex-col justify-start"
                  style={{ minHeight: "0px" }}
                >
                  <TextField
                    helperText="询问任何问题"
                    variant="standard"
                    id="standard-basic"
                    multiline
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="mb-2 mt-1 flex items-center justify-between sm:mt-5">
                  <div className="flex gap-x-1.5 text-token-text-primary">
                    <div>
                      <div className="relative">
                        <div className="relative">
                          <div className="flex flex-col">
                            <input
                              tabIndex={-1}
                              className="hidden"
                              type="file"
                              style={{ display: "none" }}
                            />
                            <span className="hidden"></span>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-1.5">
                    <div className="min-w-9">
                      <div>
                        <button
                          onClick={toAnswer}
                          data-testid="composer-speech-button"
                          className="relative flex h-9 items-center justify-center rounded-full bg-black text-white transition-colors focus-visible:outline-none focus-visible:outline-black disabled:text-gray-50 disabled:opacity-30 can-hover:hover:opacity-70 dark:bg-white dark:text-black w-9"
                        >
                          <div className="flex items-center justify-center cursor-pointer">
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon-2xl"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
