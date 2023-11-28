import React from 'react'
import BrokerEditForm from '../components/page_specific/BrokerEditForm'
import "../static/css/MultiPageCSS.css";

function EditBroker() {
  return (
    <div>
      <div className='title'>
        <h1> Edit </h1>
      </div>
      <div>
        <BrokerEditForm />
      </div>
    </div>
  )
}

export default EditBroker