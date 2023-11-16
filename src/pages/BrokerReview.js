import React from 'react'
import BrokerReviewForm from '../components/BrokerReviewForm'
import "../styles/MultiPageCSS.css";

function BrokerReview() {
  return (
    <div>
      <div className='title'>
        <h1> Broker Review </h1>
      </div>
      <div>
        <BrokerReviewForm />
      </div>
    </div>
  )
}

export default BrokerReview