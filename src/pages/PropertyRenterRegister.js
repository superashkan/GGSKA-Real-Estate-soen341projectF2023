import React from 'react'
import PropertyRenterForm from '../components/page_specific/PropertyRenterForm';
import "../static/css/MultiPageCSS.css";

function PropertyRenterRegister() {
  return (
    <div>
      <div className='title'>
        <h1> Registration </h1>
      </div>
      <div>
        <PropertyRenterForm />
      </div>
    </div>
  )
}

export default PropertyRenterRegister