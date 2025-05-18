import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userName, setUserName] = useState(null);

    const login = (username) => {setUserName(username)};
    const logout = () => {setUserName(null)};

    return (
        <AuthContext.Provider value={{userName, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);