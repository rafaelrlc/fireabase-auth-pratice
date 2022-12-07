import React from "react";

const AuthContext = React.createContext({
  JWT: "" | null,
  isLoggedIn: false | true,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
