import React from 'react'
import Search from './Sidebar Comp/Search'
import Conversations from './Sidebar Comp/Conversations'
import Logout from './Sidebar Comp/Logout'

const Sidebar = () => {
  return (
    <div style={{"display":"flex","flexDirection":"column","borderRightWidth":"1px", "border":"1px solid grey"}}>
        <Search />
        <Conversations />
        <Logout />
    </div>
  )
}

export default Sidebar