

"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("b2xclusiveuser");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("b2xclusiveuserid");
    setUserId(storedUserId ? JSON.parse(storedUserId) : null);
  }, []);

  useEffect(() => {
    const storedAdminUser = localStorage.getItem("b2xclusiveadmin");
    setAdminUser(storedAdminUser ? JSON.parse(storedAdminUser) : null);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("b2xclusiveuser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("b2xclusiveuserid", JSON.stringify(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem("b2xclusiveadmin", JSON.stringify(adminUser));
    }
  }, [adminUser]);

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
        adminUser,
        setAdminUser,
        userId,
        setUserId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
