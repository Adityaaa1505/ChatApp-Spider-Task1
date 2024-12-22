import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import useLogIn from '../Hooks/useLogIn';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {loading, login} = useLogIn()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }
    
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center" }}>
                <div class="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="input-group">
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                        </div>
                        <div class="input-group">
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                        </div>
                        <button class="login-btn">Login</button>
                        <p class="signup-link">Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    </form>
                </div>
        </div>
    )
}

export default Login