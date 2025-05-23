import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userName, setUserName] = useState(
        JSON.parse(sessionStorage.getItem('currentUser') || null)
    );

    useEffect(() => {
        sessionStorage.setItem('currentUser', JSON.stringify(userName))
    }, [userName])

    const login = (username) => {setUserName(username)};
    const logout = () => {setUserName(null)};

    return (
        <AuthContext.Provider value={{userName, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);