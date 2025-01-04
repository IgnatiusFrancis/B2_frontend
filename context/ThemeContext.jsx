"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("b2xclusiveuser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  });

  const [userId, setUserId] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("b2xclusiveuserid");
      return storedUserId ? JSON.parse(storedUserId) : null;
    }
  });

  const [adminUser, setadminUser] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedadminUser = localStorage.getItem("b2xclusiveadmin");
      return storedadminUser ? JSON.parse(storedadminUser) : null;
    }
  });

  const [signin, setSignin] = useState(false);

  const profileOptions = () => {
    setSignin((prevSignin) => !prevSignin);
  };

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("b2xclusiveuser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("b2xclusiveuserid", JSON.stringify(userId));
    }
  }, [userId]);

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("b2xclusiveadmin", JSON.stringify(adminUser));
    }
  }, [adminUser]);

  return (
    <ThemeContext.Provider
      value={{
        user,
        setUser,
        signin,
        profileOptions,
        adminUser,
        setadminUser,
        userId,
        setUserId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
