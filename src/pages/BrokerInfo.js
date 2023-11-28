import React from 'react'
import BrokerInfoForm from '../components/page_specific/BrokerInfoForm'
import "../static/css/MultiPageCSS.css";

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