import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chat, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingUser, setLoadingUser] = useState(false)




  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data", { headers: { Authorization: token } });
      if (data.success) {
        setUser(data.user);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUser(false)
    }
  };


  //*function  to create a new chat 
  const createNewChat = async () => {
    try {
      if (!user) return toast("Please login to create a new chat")
      navigate("/")
      await axios.get("/api/chat/create", { headers: { Authorization: token } })
      await fetchUserChats()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchUserChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/get", { headers: { Authorization: token } })
      if (data.success) {
        setChats(data.chats)
        //* id the user has no chats then create a new chat
        if (data.chats.length === 0) {
          await createNewChat()
          return fetchUserChats()
        } else {
          setSelectedChat(data.chats[0])
        }
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);



  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null)
      setSelectedChat(false)
    }
  }, [token]);

  const value = {
    navigate,
    user,
    setChats,
    setUser,
    fetchUser,
    chat,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    axios,
    token,
    setToken,
    loadingUser,
    setLoadingUser,
    createNewChat,
    fetchUserChats,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
