import React from 'react'
import './Logout.css'
import useLogOut from '../../Hooks/useLogOut'

const Logout = () => {
  const {loading, logout} = useLogOut()
  return (
    <div>
      <button class="logout-btn" onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout