import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/MultiPageCSS.css'

function register() {
  return (
    <div>
      <div className='title'>
        <h1> Register </h1>
      </div>

      <form id="contact-form" method="POST">
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" />
        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." type="text" />

        <div className='notRegistered'>
        <Link to='/login' className="alreadyRegistered"> Already registered? Login</Link>
        </div>

        <button type="submit"> Login </button>
      </form>
    </div>
  )
}

export default register
