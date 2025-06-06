// import React, { createContext, useState } from 'react';

// export const UserStateContext = createContext();

// export default function UserContextProvider({ children }) {
//   const [user, setUser] = useState({ name: 'ahmed' });

//   const logout = () => {
//     setUser(null);
//   };

//   return ( <>
//     <UserStateContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </UserStateContext.Provider>
//     </>
//   );

// }
import React, { createContext, useContext, useState } from 'react';
import ClientApi from '../services/api/Client/ClientApi';


export const ClientStateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => { },
    login: (email, password) => { },
    logout: () => { },
    setAuthenticated: () => { },
    setToken: () => {
    },
})

export default function ClientContext({ children }) {

    const [user, setUser] = useState({})

    const [authenticated, _setAuthenticated] = useState( "true" === window.localStorage.getItem('AUTHENTICATED'))

    const login = async (email, password) => {
        await ClientApi.getCsrfToken()
        return ClientApi.login(email, password)
    }
    const logout = () => {
        setUser({})
        setAuthenticated(false)
    }
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated)
        window.localStorage.setItem( 'AUTHENTICATED', isAuthenticated)
    }
    const setToken = (token) => {
        window.localStorage.setItem('token', token)
    }
    return (
        <>
            <ClientStateContext.Provider value={{
                user,
                login,
                authenticated,
                setAuthenticated,
                setUser,
                logout,
                setToken
            }}>
                {children}
            </ClientStateContext.Provider>
        </>
    )
}
export const useUserContext = () => useContext(ClientStateContext)