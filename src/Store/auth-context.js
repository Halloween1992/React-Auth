import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login(token) {},
  logout() {},
  error: null,
  setErrorMessage() {},
});

export const AuthContextProvider = (props) => {
  const initToken = localStorage.getItem("token");
  const [token, setToken] = useState(initToken);
  const [error, setError] = useState(null);

  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);

    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const setErrorHandler = (message) => {
    setError(message);
  };

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    error,
    setErrorMessage: setErrorHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
