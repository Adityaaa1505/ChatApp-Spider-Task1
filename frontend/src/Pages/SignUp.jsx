import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom' 
import useSignUp from '../Hooks/useSignUp'

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  
  const {loading, signup} = useSignUp() 
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }
  const handleGender = (event) => {
    setInputs({...inputs, gender:event.target.value});
  };

  return (
    <div class="signup-container" style={{ "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center"}}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div class="input-group">
          <label>Full Name</label>
          <input type="text" value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} placeholder="Enter your full name" />
        </div>
        <div class="input-group">
          <label>Username</label>
          <input type="text" id="username" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} placeholder="Choose a username" />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder="Create a password" />
        </div>
        <div class="input-group">
          <label>Confirm Password</label>
          <input type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} placeholder="Confirm your password" />
        </div>
        <div class="input-group">
          <label>Gender</label>
          <div class="gender-options">
            <label>
              <input type="radio" name="gender" value="male" checked={inputs.gender === 'male'} onChange={handleGender} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={inputs.gender === 'female'} onChange={handleGender} /> Female
            </label>
          </div>
        </div>

        <button class="signup-btn">Sign Up</button>
        <p class="login-link">Already have an account? <Link to='login'>Log in</Link></p>
      </form>
    </div>
  )
}

export default SignUp