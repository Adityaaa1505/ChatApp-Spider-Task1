import React from 'react'
import './Conversation.css'
import useConversation from '../../zustand/useConversation'

const Conversation = ({conversation}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id
    return (
        <>
            <div class="chat-item" style={{"backgroundColor":`${isSelected ? "#4CAF50" : ""}`,"color":`${isSelected ? "white" : "#333"}`}} onClick={() => setSelectedConversation(conversation)}>
                <img src={conversation.profilePic} alt="Profile Picture" class="profile-pic" />
                    <div class="chat-info">
                        <h3 class="chat-name">{conversation.fullName}</h3>
                    </div>
            </div>
        </>
    )
}

export default Conversation