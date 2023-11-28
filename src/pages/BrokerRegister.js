import React from 'react'
import BrokerForm from '../components/page_specific/BrokerForm';
import "../static/css/MultiPageCSS.css";

function BrokerRegister() {
  return (
    <div>
      <div className='title'>
        <h1> Registration </h1>
      </div>
      <div>
        <BrokerForm />
      </div>
    </div>
  )
}

export default BrokerRegister