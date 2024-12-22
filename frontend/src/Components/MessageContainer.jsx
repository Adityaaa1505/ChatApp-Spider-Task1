import React, { useEffect } from 'react'
import Messages from './MessageContainer Comp/Messages'
import MessageInput from './MessageContainer Comp/MessageInput'
import useConversation from '../zustand/useConversation'

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (<>
    {!selectedConversation ? (<> </>) : (<div style={{ "display": "flex", "flexDirection": "column","border":"1px solid grey", "width": "100vh" }}>
      <div style={{ "padding": "7px", "borderBottom": "1px solid gray" }}>
        <span>To:</span>{" "}
        <span>{selectedConversation?.fullName}</span>
      </div>
      <Messages />
      <MessageInput />
    </div>
    )}
  </>
  )
}

export default MessageContainer