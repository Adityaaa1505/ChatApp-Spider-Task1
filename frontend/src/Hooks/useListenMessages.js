import React, { useEffect } from 'react'
import {useSocketContext} from '../Context/SocketContext'
import useConversation from '../zustand/useConversation'
import notification from '../Assets/notification.mp3'  

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true
        const sound = new Audio(notification)
        sound.play()
        setMessages([...messages, newMessage])
    })

    return() => socket?.off("newMessage") 
  }, [socket, setMessages, messages])
}

export default useListenMessages