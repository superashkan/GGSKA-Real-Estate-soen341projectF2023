import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import '../../static/css/Login.css'
import { useNavigate } from 'react-router-dom';

function HomebuyerForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  
  async function registerHomebuyer(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register_new', {
        accountType: "Homebuyer",
        name: name,
        email: email,
        password: password,
        age: age,
        phone: phone
      });
      alert('Registration successful. Now you can log in');
      return navigate('/Login');
    } 
    
    catch (e) {
      console.log(e);
      alert('Registration failed. Please try again later');
    }

  }


  return (
      <form id="contact-form" onSubmit={registerHomebuyer}>
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." required={true} type="text" onInput={(e) => setName(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." required={true} type="email" onInput={(e) => setEmail(e.target.value)}/>

        <label htmlFor="age">Age</label>
        <input name="age" placeholder="Enter age..." required={true} type="number" onInput={(e) => setAge(e.target.value)}/>

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" placeholder="Enter phone number..." required={true} type="string" onInput={(e) => setPhone(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." required={true} type="password" onInput={(e) => setPassword(e.target.value)}/>

        <div className='notRegistered'>
        <Link to='/login'> Already registered? Login</Link>
        </div>  

        <button type="submit"> Register </button>
      </form>
  )
}

export default HomebuyerForm