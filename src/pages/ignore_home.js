import React from 'react'
import BannerImage from '../assets/lol.jpg'
import '../styles/Home.css';

function home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className='headerContainer'>
        <h1> Home Sweet Home </h1>
        <p> Get started on finding your new home today! </p>
      </div>

    </div>
  )
}

export default home