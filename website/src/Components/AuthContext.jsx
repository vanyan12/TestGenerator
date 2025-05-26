import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
   fetch("http://127.0.0.1:8000/auth-check", {
    method: "GET",
    credentials: "include",
  })
  .then(async (res) => {
    setIsAuth(res.ok)
    const response = await res.json();
    console.log(response);
    setUser(response.user);
  }
    )
  .catch(() => setIsAuth(false));
  }, []);



  const login = async (user) => {
    setIsAuth(true);
    setUser(user);
  };


  const logout = async () => {
    await fetch("http://127.0.0.1:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
