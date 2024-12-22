import React from 'react'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './Context/AuthContext'

const App = () => {
  const { authUser, setAuthUser } = useAuthContext()
  return (
    <div style={{"display":"flex","padding":"1rem","justifyContent":"center","alignItems":"center",
      "height":"90vh",
      "overflow":"auto"
    }}>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster/>      
    </div>
  )
}

export default App