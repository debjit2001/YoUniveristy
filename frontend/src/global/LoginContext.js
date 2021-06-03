import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isTeacherAuth, setIsTeacherAuth] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [teacherID, setTeacherID] = useState(
    window.localStorage.getItem("username")
  );
  const [pwd, setPwd] = useState(window.localStorage.getItem("pwd"));

  return (
    <LoginContext.Provider
      value={{
        isTeacherAuth,
        setIsTeacherAuth,
        isAuth,
        setIsAuth,
        teacherID,
        setTeacherID,
        pwd,
        setPwd,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
