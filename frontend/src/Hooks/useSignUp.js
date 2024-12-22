import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext'

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const signup = async({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputError({fullName, username, password, confirmPassword, gender})
        if (!success) return;
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method:"POST",
                headers: {"Content-Type":"application/json", "Access-Control-Allow-Credentials":"true"},
                body: JSON.stringify({fullName, username, password, confirmPassword, gender}),
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
    };
    return {loading, signup}
}

export default useSignUp

function handleInputError({fullName, username, password, confirmPassword, gender}){
    if (!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all fields")
        return  false
    }

    if (password !== confirmPassword){
        toast.error("Passwords don't match")
        return false
    }
    
    if (password.length < 6){
        toast.error("Password must atleast be 6 characters")
        return false
    }
    return true
}