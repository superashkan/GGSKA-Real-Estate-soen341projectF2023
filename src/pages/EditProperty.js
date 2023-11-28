import React from 'react'
import PropertyEditForm from '../components/page_specific/PropertyEditForm'
import "../static/css/MultiPageCSS.css";

function EditProperty() {
  return (
    <div>
      <div className='title'>
        <h1> Edit </h1>
      </div>
      <div>
        <PropertyEditForm />
      </div>
    </div>
  )
}

export default EditProperty