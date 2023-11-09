import React from 'react'
import BrokerInfoForm from '../components/BrokerInfoForm'
import "../styles/MultiPageCSS.css";

function BrokerInfo() {
  return (
    <div>
      <div className='title'>
        <h1> Broker Information </h1>
      </div>
      <div>
        <BrokerInfoForm />
      </div>
    </div>
  )
}

export default BrokerInfo