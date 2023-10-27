import React from 'react'
import PropertySearchForm from '../components/PropertySearchForm'
import "../styles/MultiPageCSS.css";

function Search() {
  return (
    <div>
      <div className='title'>
        <h1> Search for Properties </h1>
      </div>
      <div>
        <PropertySearchForm />
      </div>
    </div>
  )
}

export default Search
