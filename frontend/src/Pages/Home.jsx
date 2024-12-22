import React from 'react'
import Sidebar from '../Components/Sidebar'
import MessageContainer from '../Components/MessageContainer'

const Home = () => {
  return (
    <div style={{"display":"flex",
      "height":"85vh",
      "borderRadius":"0.5rem"}}>
      <Sidebar/>
      <MessageContainer />
    </div>
  )
}

export default Home