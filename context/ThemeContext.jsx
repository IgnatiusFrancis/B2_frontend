"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userName", JSON.stringify(user));
    }
  }, [user]);

  const profileOptions = () => {
    setSignin((prevSignin) => !prevSignin);
  };

  return (
    <ThemeContext.Provider
      value={{
        user,
        setUser,
        signin,
        profileOptions,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
