import React, { useState } from 'react'
import './MessageInput.css'
import useSendMessage from '../../Hooks/useSendMessage'

const MessageInput = () => {
  const [ message, setMessage ] = useState("")
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage("")
  }
  return (
    <form style={{ "padding": "0.5rem", "borderTop": "1px solid gray" }} onSubmit={handleSubmit}>
      <div style={{ "width": "100%" }}>
        <input
          type="text"
          placeholder="Send a message..."
          class="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button class="send-btn">Send</button>
      </div>
    </form>
  )
}

export default MessageInput