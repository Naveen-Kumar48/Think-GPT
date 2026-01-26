import React, { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import moment from "moment";
import toast from "react-hot-toast";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const {
    chat,
    setSelectedChat,
    setTheme,
    theme,
    user,
    navigate,
    setUser,
    createNewChat,
    token,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
  } = useAppContext();
  //* function for the logout 
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out Successfully");
  };

  //*function for deleting  the chat 
  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm('Are you sure  you want to delete the this chat?');
      if (!confirm) return
      const { data } = await axios.post('/api/chat/delete', { chatId }, {
        headers: { Authorization: token }
      })
      if (data.success) {
        setChats(prev => prev.filter(chat => chat._id !== chatId))
        await fetchUsersChats()
        window.location.reload()
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  const [search, setSearch] = useState("");
  return (
    <div>
      <div
        className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from
[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl
transition-all duration-500 max-md:absolute left-0 z-10 ${!isMenuOpen && "max-md:hidden"
          }`}
      >
        {/* {logo} */}
        <img
          src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
          alt=""
          className="w-full max-w-48"
        />


        {/* {New Chat Button} */}
        <button
          onClick={() => {
            createNewChat();
            setIsMenuOpen(false);
          }}
          className="flex justify-center items-centre w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6]  text-sm rounded-md cursor-pointer"
        >
          <span className="mr-2 text-xl">+</span> NewChat
        </button>
        {/* search conversation  */}
        <div className="flex  items-center gap-2 mt-4 p-3  border  border-gray-400  dark:border-white/20 rounded-md">
          <img
            src={assets.search_icon}
            className="w-4 not-dark:invert"
            alt=""
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search Conversation"
            className=" text-xs  placeholder:text-gray-400 outline-none  "
          />
        </div>
        {/* {recent chat} */}
        {chat.length > 0 && <p className="mt-4 text-sm"> Recent chats</p>}
        <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
          {chat
            .filter((chat) =>
              chat.messages[0]
                ? chat.messages[0]?.content
                  .toLowerCase()
                  .includes(search.toLowerCase())
                : chat.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((chat) => {
              return (
                <div
                  onClick={() => {
                    navigate("/");
                    setSelectedChat(chat);
                    setIsMenuOpen(false);
                  }}
                  key={chat._id}
                  className="p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer group"
                >
                  <div>
                    <p className="truncate w-full">
                      {chat.messages.length > 0
                        ? chat.messages[0].content.slice(0, 32)
                        : chat.name}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                      {moment(chat.updatedAt).fromNow()}
                    </p>

                    <img
                      onClick={e => toast.promise(deleteChat(e, chat._id), { loading: "deleting..." })}
                      src={assets.bin_icon}
                      className="w-4  hidden group-hover:block cursor-pointer not-dark:invert"
                      alt="delete"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        {/* {community images } */}
        <div
          onClick={() => {
            navigate("/community");
            setSelectedChat(chat);
            setIsMenuOpen(false);
          }}
          className=" flex items-center gap-2  p-3 mt-4 border  border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
        >
          <img
            src={assets.gallery_icon}
            alt=""
            className="w-4.5 not-dark:invert"
          />
          <div className="flex flex-col text-sm">
            <p>Community images </p>
          </div>
        </div>
        {/* {credit purchase option  } */}
        <div
          onClick={() => {
            navigate("/credits");
            setSelectedChat(chat);
            setIsMenuOpen(false);
          }}
          className=" flex items-center gap-2  p-3 mt-4 border  border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all"
        >
          <img src={assets.diamond_icon} alt="" className="w-4.5 bg-amber-50" />
          <div className="flex flex-col text-sm">
            <p>Credits:{user?.credits} </p>
            <p className="text-xs  text-gray-400">
              {" "}
              Purchase credits to use the quickGpt
            </p>
          </div>
        </div>
        {/* {Dark mode option  } */}
        <div className=" flex items-center gap-2  p-3 mt-4 border  border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all">
          <img
            src={assets.theme_icon}
            alt=""
            className="w-4.5 text-invert-dark"
          />
          <div className="flex flex-col text-sm">
            <p>Dark mode </p>
            <p className="text-xs  text-gray-400"> </p>
          </div>
          <label className="relative  inline-flex  cursor-pointer">
            <input
              onChange={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
            />
          </label>
        </div>

        {/* user account */}

        <div className=" flex items-center gap-2  p-3 mt-4 border  border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all group">
          <img src={assets.user_icon} alt="" className="w-4.5 bg-amber-50" />
          <div className="flex flex-col text-sm">
            <p className="flex-1 text-smd dark:text-primary truncate">
              {user ? user.name : "Login your account"}{" "}
              {user && (
                <img
                  onClick={logout}
                  src={assets.logout_icon}
                  className="h-5 cursor-pointer hidden not-dark:invert group-hover:block"
                />
              )}
            </p>
          </div>
        </div>
        <img
          onClick={() => setIsMenuOpen(false)}
          src={assets.close_icon}
          className="absolute top-3  right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
          alt=""
        />
      </div>
    </div>
  );
};

export default Sidebar;
