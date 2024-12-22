import React, { useEffect } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations'

const Conversations = () => {
  const {loading, conversation, getConversation} = useGetConversations()
  useEffect(() => {
    getConversation()
  }, [])
  return (
    <div style={{"display":"flex","paddingTop":"0.5rem","paddingBottom":"0.5rem","flexDirection":"column"}}>
      {conversation.map((conversation) => (<Conversation 
        key={conversation._id} 
        conversation={conversation}
        />))}
    </div>
  )
}

export default Conversations