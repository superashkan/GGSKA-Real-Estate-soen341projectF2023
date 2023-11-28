import React from 'react'
import PropertySaleManagement from '../components/page_specific/PropertySaleManagement'
import "../static/css/MultiPageCSS.css";

function Sell() {
  return (
    <div>
      <div className='title'>
        <h1> List a Property for Sale </h1>
      </div>
      <div>
        <PropertySaleManagement />
      </div>
    </div>
  )
}

export default Sell
