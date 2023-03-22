import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider , useAuth}