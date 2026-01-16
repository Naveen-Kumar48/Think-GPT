import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chat, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const fetchUser = async () => {
    setUser(dummyUserData);
  };
  const fetchUserChats = async () => {
    setChats(dummyChats);
    setSelectedChat(dummyChats[0]);
  };
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])


  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectedChat(null)
    }
  }, [user]);


  useEffect(() => {
    fetchUser();
  }, []);

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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
