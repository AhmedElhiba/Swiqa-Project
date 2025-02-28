import { createContext, useState } from "react"


export const UserStateContext =createContext({
    user:{},
    setUser:()=>{},
    logout:()=>{},
})
export default function UserContext({children}){
    const [user,setUser]=useState(
     {   name:'ahmed'}
    )   
    const logout =() =>{}

    return<>
    <UserStateContext.Provider value={{
        user,
        setUser,
        logout
    }}>
        {children}
    </UserStateContext.Provider>
    </>
}