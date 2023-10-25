import React from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'


function login() {
  return (
        <div>
            <h1 className='title'> Login </h1>
    
            <form id="contact-form" method="POST">
              <label htmlFor="name">Full Name</label>
              <input name="name" placeholder="Enter full name..." type="text" />
              <label htmlFor="email">Email</label>
              <input name="email" placeholder="Enter email..." type="email" />
              <label htmlFor="password">Password</label>
              <input name="password" placeholder="Enter password..." type="email" />

              <div className='notRegistered'>
              <Link to='/register'> Not yet registered? Do it now!</Link>
              </div>  

              <button type="submit"> Login </button>
            </form>
        </div>
      );
    }
    

export default login