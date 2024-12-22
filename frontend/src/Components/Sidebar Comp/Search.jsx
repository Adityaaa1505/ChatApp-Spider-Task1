import React, { useEffect, useState } from 'react'
import './Search.css'
import useConversation from '../../zustand/useConversation'
import useGetConversations from '../../Hooks/useGetConversations'
import toast from 'react-hot-toast'

const Search = () => {
  const [search, setSearch] = useState("")
  const {setSelectedConversation} = useConversation()
  const {conversation, getConversation} = useGetConversations()
  useEffect(() => {
      getConversation()
    }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) return toast.error("Search atleast 3 characters")
    
    const con = conversation.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    if (con){
      setSelectedConversation(con)
      setSearch("")
    } else toast.error("No such user found!")
  }

  return (
    <form style={{"display":"flex","alignItems":"center"}} onSubmit={handleSubmit}>
        <input type="text" class="search-input" placeholder="Type your search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button class="search-btn">Search</button>
    </form>
  )
}

export default Search