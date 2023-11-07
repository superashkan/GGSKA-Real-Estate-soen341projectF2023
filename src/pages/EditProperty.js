import React from 'react'
import PropertyEditForm from '../components/PropertyEditForm'
import "../styles/MultiPageCSS.css";

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