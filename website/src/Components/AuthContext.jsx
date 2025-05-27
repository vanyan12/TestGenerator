import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   fetch("http://127.0.0.1:8000/auth-check", {
    method: "GET",
    credentials: "include",
  })
  .then(async (res) => {
    setIsAuth(res.ok)
    const response = await res.json();
    setUser(response.user);
  }
    )
  .catch(() => setIsAuth(false))
  .finally(() => setLoading(false))
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
    <AuthContext.Provider value={{ user, isAuth, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
