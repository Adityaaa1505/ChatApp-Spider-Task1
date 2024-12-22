import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext'
import toast from 'react-hot-toast'

const useLogIn = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext() 
    const login = async (username, password) => {
        const success = handleInputError({username, password})
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type":"application/json", "Access-Control-Allow-Credentials":"true"},
                body: JSON.stringify({username, password}),
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            if (data.error) throw new Error(data.error)
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, login}
}

export default useLogIn

function handleInputError({fullName, username, password, confirmPassword, gender}){
    if (!username || !password){
        toast.error("Please fill all fields")
        return  false
    }
    return true
}