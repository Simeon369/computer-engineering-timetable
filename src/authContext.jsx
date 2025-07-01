import {createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        const storedLogin = localStorage.getItem("loggedIn")
        
        if (storedLogin === 'true'){
            setLoggedIn(true); 
        } 
    
    }, [])


    useEffect(()=>{
      localStorage.setItem("loggedIn", loggedIn)
    }, [loggedIn])



   
    
    return(
        <AuthContext.Provider value = {{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)