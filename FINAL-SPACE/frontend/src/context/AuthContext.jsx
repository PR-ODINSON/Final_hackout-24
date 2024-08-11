import { createContext, useContext, useState } from "react";

export const AuthContext=createContext();
export const useAuthContext=()=>{
    return useContext(AuthContext);
}
export const AuthContextProvider=({children})=>{
    const [collidedPlanet, setCollidedPlanet] = useState(() => {
        const savedPlanets = localStorage.getItem('collidedPlanets');
        return savedPlanets ? new Set(JSON.parse(savedPlanets)) : new Set();
    });
    const [Authuser,setAuthuser]=useState(JSON.parse(localStorage.getItem("space-user")) || null);
    return <AuthContext.Provider value={{Authuser,setAuthuser,collidedPlanet,setCollidedPlanet}}>
        {children}
        </AuthContext.Provider>
}