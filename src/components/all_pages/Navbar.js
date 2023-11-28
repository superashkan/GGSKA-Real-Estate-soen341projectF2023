import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../static/images/white back logo.jpg'
import '../../static/css/NewHome.css'
import { BrokerContext } from '../../helpers/BrokerContext'
import { AccountContext } from '../../helpers/AccountContext'


function Navbar() {

const {account} = useContext(AccountContext)

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

          {(!account || (!!account && account.accountType !== "Property Renter")) && (
            <li>
              <Link to='/buy'><span className="navbar-link label-medium">Buy</span></Link>
            </li>
          )}

          <li>
            <Link to='/Search'><span className="navbar-link label-medium">Search</span></Link>
          </li>

          <li>
            <Link to='/brokers'><span className="navbar-link label-medium">Brokers</span></Link>
          </li>

        </ul>

        {/* {!broker &&( */}
        {!account &&(
          <div className='navbar-wrapper'>
            <Link to='/NewLogin'><span className="btn btn-fill label-medium">Login</span></Link>
            <Link to='/AccountType'><span className="btn btn-fill label-medium">Get Started</span></Link>
          </div>
        )}

        {/* {!!broker &&( */}
        {(!!account && account.accountType === "Broker") &&(
          <div className='btn-link label-medium'>
            {/* <Link to='/profile'><span className="btn btn-fill label-medium">{broker.name}</span></Link> */}
            <Link to='/BrokerProfile'><span className="btn btn-fill label-medium">{account.name}</span></Link>
          </div>
        )}
        {(!!account && account.accountType === "Property Renter") &&(
          <div className='btn-link label-medium'>
            {/* <Link to='/profile'><span className="btn btn-fill label-medium">{broker.name}</span></Link> */}
            <Link to='/PropertyRenterProfile'><span className="btn btn-fill label-medium">{account.name}</span></Link>
          </div>
        )}
        {(!!account && account.accountType === "Homebuyer") &&(
          <div className='btn-link label-medium'>
            {/* <Link to='/profile'><span className="btn btn-fill label-medium">{broker.name}</span></Link> */}
            <Link to='/HomebuyerProfile'><span className="btn btn-fill label-medium">{account.name}</span></Link>
          </div>
        )}

      </nav>

      <button className="nav-toggle-btn icon-btn" aria-label="toggle navbar" data-nav-toggler>
        <span className="material-symbols-rounded open" aria-hidden="true">Menu</span>
        <span className="material-symbols-rounded close" aria-hidden="true">Close</span>
      </button>

    </div>
  </header>


  )
}

export default Navbar
