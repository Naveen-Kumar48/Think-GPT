import React, { useEffect, useRef, useState } from "react";

import { assets } from "../assets/assets";
import Message from "./Message";
import { useAppContext } from "../Context/AppContext";

function Chatbot() {

  const containerRef=useRef(null)
  const { selectedChat } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages || []);
    }
  }, [selectedChat]);

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top:containerRef.current.scrollHeight,
        behavior:"smooth",
      })
    }
  },[messages])
  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14">
      {/* ChatMessages */}
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-primary flex justify-center items-center h-full">
            <img
              src={assets.logo_full}
              alt="Logo"
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400">
              Ask me anything
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <Message key={index} messages={msg} />
        ))}

        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items center-centre gap-2 mb-3 text-sm mx-auto">
          <p className="text-xs">Publish Generated Image To  Community</p>
          <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} />
        </label>
      )}

      {/* Prompt Input Box*/}
      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center"
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="tex-sm pl-3 pr-2 outline-none"
        >
          <option className="dark:bg-purple-900" value="text">
            Text
          </option>
          <option className="dark:bg-purple-900" value="image">
            Image
          </option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your prompt here...."
          className="flex-1 w-full text-sm outline-none"
          required
        />

        <button disabled={loading}>
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="w-8 cursor-pointer"
            alt=""
          />
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
