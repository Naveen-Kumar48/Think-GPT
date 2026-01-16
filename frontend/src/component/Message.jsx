import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import moment from 'moment'
import Markdown from "react-markdown";
import { plugins } from "prismjs";
function Message({ messages }) {
  useEffect(()=>{
    Prism.highlightAll()
  },[messages.content])
  return (
    <div>
      {messages.role === "user" ? (
        <div className="flex items-center justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-[#57317C]/30 border border-gray-600 rounded-md max-w-2xl">
            <p className="text-sm text-primary">{messages.content}</p>
            <span className="text-xs text-gray-500">
              {moment(messages.timestamp).fromNow()}
            </span>
          </div>
          <img
            className="w-8 rounded-full"
            src={assets.user_icon}
            alt="User"
          />
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-[#57317C]/30 border border-gray-300 rounded-md my-4">
          {messages.isImage ? (
            <img
              src={messages.content}
              className="w-full max-w-md mt-2 rounded-md"
              alt="AI response"
            />
          ) : (
            <div className="text-sm text-primary reset-tw">
             
              <Markdown>{messages.content}</Markdown>
            </div>
          )}

          <span className="text-xs text-gray-500"> {messages.timestamp}
          </span>
        </div>
      )}
    </div>
  );
}

export default Message;