import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'

import './Message.css'
import useConversation from '../../zustand/useConversation'
const Message = ({ message }) => {
    const { authUser } = useAuthContext()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const chatClassName = fromMe ? "right" : "left"
    const shakeClass = message.shouldShake ? "shake" : ""
    return (
        <>
            <p class={`${chatClassName} ${shakeClass}`}>
                {message.message}
            </p>
        </>
    )
}

export default Message