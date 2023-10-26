import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/white back logo.jpg'
import '../styles/NewHome.css'



function NewNavbar() {
useEffect(() => {
    
    'use strict';


const /** {NodeElement} */ $navbar = document.querySelector("[data-navbar]");
const /** {NodeElement} */ $navToggler = document.querySelector("[data-nav-toggler]");

$navToggler.addEventListener("click", () => $navbar.classList.toggle("active"));



/**
 * Header scroll state
 */

const /** {NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", e => {
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});
}, []);

  return (


    <header className="header" data-header>
    <div className="container">

    <Link to='/'>
      <img style={{ mixBlendMode: "multiply", height: "70px", width: "100%"}} src={Logo}  alt="Your Logo" />
    </Link>
 

      <nav className="navbar" data-navbar>

        <ul className="navbar-list">

          <li>
            <Link to='/'><span className="navbar-link label-medium">Home</span></Link>
          </li>

          <li>
            <Link to='/rent'><span className="navbar-link label-medium">Rent</span></Link>
          </li>

          <li>
          <Link to='/buy'><span className="navbar-link label-medium">Buy</span></Link>
          </li>

          <li>
            <Link to='/'><span className="navbar-link label-medium">Sell</span></Link>
          </li>


        </ul>

        <div class="navbar-wrapper">
            <Link to='/login'><span className="btn-link label-medium">Login</span></Link>
            <Link to='/register'><span className="btn btn-fill label-medium">Get Started</span></Link>

        </div>

      </nav>

      <button className="nav-toggle-btn icon-btn" aria-label="toggle navbar" data-nav-toggler>
        <span className="material-symbols-rounded open" aria-hidden="true">Menu</span>
        <span className="material-symbols-rounded close" aria-hidden="true">Close</span>
      </button>

    </div>
  </header>


  )
}

export default NewNavbar