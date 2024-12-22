import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])

    const getConversation = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/users",{
                credentials:"include"
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setConversation(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, conversation, getConversation }
}

export default useGetConversations