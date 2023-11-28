import React from 'react'
import OfferSubmissionForm from '../components/page_specific/OfferSubmissionForm'
import "../static/css/MultiPageCSS.css";

function Offer() {
  return (
    <div>
      <div className='title'>
        <h1> Make an Offer for Purchase of a Property </h1>
      </div>
      <div>
        <OfferSubmissionForm />
      </div>
    </div>
  )
}

export default Offer
