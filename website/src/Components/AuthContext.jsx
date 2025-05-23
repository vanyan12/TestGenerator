import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
