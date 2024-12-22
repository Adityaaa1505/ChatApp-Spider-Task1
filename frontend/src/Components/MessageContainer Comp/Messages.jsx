import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../Hooks/useGetMessage'
import useListenMessages from '../../Hooks/useListenMessages'

const Messages = () => {
  const {loading, messages} = useGetMessage()
  useListenMessages()
  const lasMessageRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      lasMessageRef.current?.scrollIntoView({behavior:"smooth"})
    }, 100);
  }, [messages])
  return (
    <div style={{"display":"flex","flexDirection":"column","overflow":"auto","overflowX":"hidden","paddingLeft":"1rem","paddingRight":"1rem"}}>
      {!loading && messages.length > 0 && messages.map((message) => <div key={message._id} ref={lasMessageRef}><Message message={message} /></div>)}
    </div>
  )
}

export default Messages