import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import '../static/css/Login.css'

function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone,setPhone] = useState('');
  const [licenseNumber,setLicenseNumber] = useState('');
  const [agency,setAgency] = useState('');
  
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
        age,
        phone,
        licenseNumber,
        agency,
      });
      alert('Registration successful. Now you can log in');
    } 
    
    catch (e) {
      alert('Registration failed. Please try again later');
    }

  }


  return (
    <div className="registerForm">
      <div className='registerTitle'>
        <h1> Register </h1>
      </div>

      <form id="contact-form" onSubmit={registerUser}>
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="age">Age</label>
        <input name="age" placeholder="Enter age..." type="number" onChange={(e) => setAge(e.target.value)}/>

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" placeholder="Enter phone number..." type="string" onChange={(e) => setPhone(e.target.value)}/>

        <label htmlFor="licenseNumber">License Number</label>
        <input name="licenseNumber" placeholder="Enter license number..." type="number" onChange={(e) => setLicenseNumber(e.target.value)}/>

        <label htmlFor="agency">Name of Agency</label>
        <input name="agency" placeholder="Enter the name of your agency..." type="string" onChange={(e) => setAgency(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." type="password" onChange={(e) => setPassword(e.target.value)}/>

        <div className='notRegistered'>
        <Link to='/login'> Already registered? Login</Link>
        </div>  

        <button type="submit"> Register </button>
      </form>
    </div>
  )
}

export default Register