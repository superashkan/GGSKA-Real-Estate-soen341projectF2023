import React from 'react'
import PropertySellForm from '../components/page_specific/PropertySellForm'
import "../static/css/MultiPageCSS.css";

function Sell() {
  return (
    <div>
      <div className='title'>
        <h1> List a Property for Sale </h1>
      </div>
      <div>
        <PropertySellForm />
      </div>
    </div>
  )
}

export default Sell
