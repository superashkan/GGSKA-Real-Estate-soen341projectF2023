import React from 'react'
import GenericMortgageCalculatorForm from '../components/page_specific/GenericMortgageCalculatorForm'
import "../static/css/MultiPageCSS.css";

function GenericMortgageCalculator() {
  return (
    <div>
      <div className='title'>
        <h1> Calculate Monthly Mortgage </h1>
      </div>
      <div>
        <GenericMortgageCalculatorForm />
      </div>
    </div>
  )
}

export default GenericMortgageCalculator