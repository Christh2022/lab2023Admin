import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {createContext, useContext, useEffect, useState} from 'react';
import { auth } from '../firebase';



export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState()
    
    const signUp= (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password)=>{
        return  signInWithEmailAndPassword(auth, email, password)
    }

    const logout =()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user) 
        })
        return unSubscribe()    
    }, [])

    return (
        <AuthContext.Provider value={{signUp, login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const  UserAuth = ()=>{
    return useContext(AuthContext)
}