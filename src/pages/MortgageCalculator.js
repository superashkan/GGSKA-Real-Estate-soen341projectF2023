import React from 'react'
import MortgageCalculatorForm from '../components/page_specific/MortgageCalculatorForm'
import "../static/css/MultiPageCSS.css";

function MortgageCalculator() {
  return (
    <div>
      <div className='title'>
        <h1> Calculate Monthly Mortgage </h1>
      </div>
      <div>
        <MortgageCalculatorForm />
      </div>
    </div>
  )
}

export default MortgageCalculator