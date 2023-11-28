import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import '../../static/css/Login.css'
import { useNavigate } from 'react-router-dom';

function PropertyRenterForm() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone,setPhone] = useState('');
  
  async function registerPropertyRenter(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register_new', {
        accountType: "Property Renter",
        name: name,
        email: email,
        password: password,
        age: age,
        phone: phone,
      });
      alert('Registration successful. Now you can log in');
      return navigate('/Login');
    } 
    
    catch (e) {
      alert('Registration failed. Please try again later');
    }

  }


  return (
      <form id="contact-form" onSubmit={registerPropertyRenter}>
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="age">Age</label>
        <input name="age" placeholder="Enter age..." type="number" onChange={(e) => setAge(e.target.value)}/>

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" placeholder="Enter phone number..." type="string" onChange={(e) => setPhone(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." type="password" onChange={(e) => setPassword(e.target.value)}/>

        <div className='notRegistered'>
        <Link to='/login'> Already registered? Login</Link>
        </div>  

        <button type="submit"> Register </button>
      </form>
  )
}

export default PropertyRenterForm