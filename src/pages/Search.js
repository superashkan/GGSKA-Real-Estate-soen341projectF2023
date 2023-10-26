import React from 'react'
import { useState } from 'react'
import PropertySearchForm from '../components/PropertySearchForm'
//import { propertyList } from '../propertyList.js'

function isNullOrEmpty(stringInput) {
  if (stringInput === null || stringInput.toString().trim() === "") {
    return true;
  } else {
    return false;
  }
}

function Search() {
  // var [state, setState] = useState({
  //   minPriceTracker: 0.00,
  //   maxPriceTracker: 0.00,
  //   errorMessage: "Please enter at least one search criterion",
  //   isSearchButtonDisabled: true
  // });
  // return (
  //   <div>
  //     <h1> Search </h1>
  //
  //     <form id="search-form" method="GET">
  //       <label htmlFor="address">Address</label>
  //       <input name="address" id="address" placeholder="Address" type="text" />
  //       <label htmlFor="min_price">Minimum Price</label>
  //       <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onBlur={performChecks(this.state.minPriceTracker, this.state.maxPriceTracker, this.state.errorMessage, this.state.isSearchButtonDisabled)} />
  //       <label htmlFor="max_price">Maximum Price</label>
  //       <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onBlur={performChecks(this.state.minPriceTracker, this.state.maxPriceTracker, this.state.errorMessage, this.state.isSearchButtonDisabled)} />
  //       <label htmlFor="numBedrooms"># of Bedrooms</label>
  //       <select id="numBedrooms" name="numBedrooms" defaultValue="">
  //           <option value="" disabled>Select Beds</option>
  //           <option value="noselection">No Selection</option>
  //           <option value="1">1 Bed</option>
  //           <option value="2">2 Beds</option>
  //           <option value="3">3 Beds</option>
  //           <option value="4">4 Beds</option>
  //           <option value="5">5 Beds</option>
  //       </select>
  //       <label htmlFor="numBathrooms"># of Bathrooms</label>
  //       <select id="numBathrooms" name="numBathrooms" defaultValue="">
  //           <option value="" disabled>Select Beds</option>
  //           <option value="noselection">No Selection</option>
  //           <option value="1">1 Bed</option>
  //           <option value="2">2 Beds</option>
  //           <option value="3">3 Beds</option>
  //           <option value="4">4 Beds</option>
  //           <option value="5">5 Beds</option>
  //       </select>
  //       <div id="errorMessage">{this.state.errorMessage}</div>
  //       <button type="submit" disabled={this.state.isSearchButtonDisabled}> Search </button>
  //     </form>
  //   </div>
  // )
  return (
    <div>
      <PropertySearchForm />
    </div>
  )
}

export default Search
