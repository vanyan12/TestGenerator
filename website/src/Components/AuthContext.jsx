import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    sessionStorage.getItem("currentUser") || null
  );

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("currentUser", token);
    } else {
      sessionStorage.removeItem("currentUser");
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
