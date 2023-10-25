import React, { useState } from 'react'
import Logo from '../assets/white back logo.jpg'
import { Link } from 'react-router-dom'
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';


//Navagation bar on the top of every page

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);

    }

  return (
    <div className='navbar'>
        <div className='leftSide' id={openLinks ? "open" : "close"}>  
            <Link to='/'> 
                <img src={Logo} /> 
            </Link> 
                <div className='hiddenLinks'>
                    <Link to='/'> Buy </Link>
                    <Link to='/'> Rent </Link>
                    <Link to='/login'> Login </Link>
                </div>
        </div>
        
        <div className='rightSide'>
            <Link to='/'> Buy </Link>
            <Link to='/'> Rent </Link>
            <Link to='/login'> Login </Link>
            <button onClick={toggleNavbar}>
                <ReorderIcon />
            </button>
        </div>
        

    </div>
  )
}

export default Navbar