import React from 'react'
import HomebuyerForm from '../components/page_specific/HomebuyerForm';
import "../static/css/MultiPageCSS.css";

function HomebuyerRegister() {
  return (
    <div>
      <div className='title'>
        <h1> Homebuyer Registration </h1>
      </div>
      <div>
        <HomebuyerForm />
      </div>
    </div>
  )
}

export default HomebuyerRegister