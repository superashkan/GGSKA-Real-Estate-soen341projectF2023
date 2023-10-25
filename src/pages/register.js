import React from 'react'
import { Link } from 'react-router-dom'


function register() {
  return (
    <div>

      <h1> Register </h1>

      <form id="contact-form" method="POST">
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" />
        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." type="email" />

        <div className='notRegistered'>
        <Link to='/login'> Already registered? Login</Link>
        </div>  

        <button type="submit"> Login </button>
      </form>
    </div>
  )
}

export default register