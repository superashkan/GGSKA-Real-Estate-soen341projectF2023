import React, { useState, useEffect } from 'react'
import { BuyList } from '../helpers/BuyList'
import "../styles/MultiPageCSS.css";
import "../styles/Search.css"
import axios from "axios";

function PropertySearchForm() {

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [type, setType] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("Please enter at least one search criterion");
  const [propertyList, setPropertyList] = useState([]);
  const [results, setResults] = useState([]);

  const neatlyFormatValue = function(value) {
    var newValueStr = "";
    var forwardPositionCounter = 0;
    for (var i = value.toString().length - 1;i >= 0;i--) {
      if ((forwardPositionCounter % 3 == 0 && forwardPositionCounter > 0)) {
        newValueStr = "," + newValueStr;
      }
      newValueStr = value.toString()[i] + newValueStr;
      forwardPositionCounter++;
    }
    return newValueStr;
  }

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const handleSearch = async function(event) {
    event.preventDefault();
    try{
      var isSearchOkay = performChecks();
      if (!isSearchOkay) {
        alert(errorMessage);
        return;
      }
      axios.post('/searchProperties', {address,maxSize,minSize,maxPrice,minPrice,bedrooms,bathrooms,type}).then((response) => {
        setResults(response.data);
        console.log(response);
      });
    }
    catch (e){
      alert(e);
      alert('Search failed')
    }
  }

  const performChecks = function() {
    if (isNullOrEmpty(address)) {
      if (isNullOrEmpty(minPrice)) {
        if (isNullOrEmpty(maxPrice)) {
          if (isNullOrEmpty(bedrooms)) {
            if (isNullOrEmpty(bathrooms)) {
              if (isNullOrEmpty(minSize)) {
                if (isNullOrEmpty(maxSize)) {
                  if (isNullOrEmpty(type)) {
                    setErrorMessage("Please enter at least one search criterion.");
                    setResults([]);
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (minPrice < 0.00) {
      setErrorMessage("Minimum price must not be negative.");
      setResults([]);
      return false;
    }
    if (maxPrice <= 0.00 && maxPrice.toString() != '') {
      setErrorMessage("Maximum price must be positive.");
      setResults([]);
      return false;
    }
    if (minSize < 0.00) {
      setErrorMessage("Minimum property size must not be negative.");
      setResults([]);
      return false;
    }
    if (maxSize <= 0.00 && maxSize.toString() != '') {
      setErrorMessage("Maximum property size must be positive.");
      setResults([]);
      return false;
    }
    if ((minPrice == 0 && maxPrice == 0) && (minPrice.toString() != '' && maxPrice.toString() != '')) {
      setErrorMessage("Please choose a minimum or maximum price.");
      setResults([]);
      return false;
    }
    if ((minSize == 0 && maxSize == 0) && (minSize.toString() != '' && maxSize.toString() != '')) {
      setErrorMessage("Please choose a minimum or maximum lot size.");
      setResults([]);
      return false;
    }
    if (minPrice > maxPrice && maxPrice != '') {
      setErrorMessage("Maximum price must be greater than minimum price.");
      setResults([]);
      return false;
    }
    if (minSize > maxSize  && maxSize != '') {
      setErrorMessage("Maximum lot size must be greater than minimum lot size.");
      setResults([]);
      return false;
    }
    setErrorMessage("");
    return true;
  }

  const constructHTML = function() {
    if (results.length == 0) {
      return (
        <div>
        <form id="search-form" onSubmit={handleSearch}>
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
          <label htmlFor="min_price">Minimum Price</label>
          <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onInput={(event) => setMinPrice(parseFloat(event.target.value))} />
          <label htmlFor="max_price">Maximum Price</label>
          <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onInput={(event) => setMaxPrice(parseFloat(event.target.value))}/>
          <label htmlFor="type">Type of Property</label>
          <select id="type" name="type" class="dropdown" onInput={(event) => setType(event.target.value)}>
              <option value="" selected disabled>What type of property are you searching for?</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhome">Townhome</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Loft">Loft</option>
          </select>
          <label htmlFor="numBedrooms">Number of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" className="dropdown" onChange={(event) => setBedrooms(event.target.value)}>
              <option value="" selected disabled>How many bedrooms are you looking for?</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" className="dropdown" onChange={(event) => setBathrooms(event.target.value)}>
              <option value="" selected disabled>How many bathrooms are you searching for?</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
              <option value="5">5 Bathrooms</option>
          </select>
          <label htmlFor="min_size">Minimum Lot Size</label>
          <input name="min_size" id="min_size" placeholder="Minimum Lot Size (sqft.)" type="number" onInput={(event) => setMinSize(parseFloat(event.target.value))} />
          <label htmlFor="max_size">Maximum Lot Size</label>
          <input name="max_size" id="max_size" placeholder="Maximum Lot Size (sqft.)" type="number" onChange={(event) => setMaxSize(parseFloat(event.target.value))}/>
          <button className="propertySearchButton" type="submit"> Search </button>
        </form>
        </div>
      );
    } else {
      return (
        <div>
        <form id="search-form" onSubmit={handleSearch}>
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
          <label htmlFor="min_price">Minimum Price</label>
          <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onInput={(event) => setMinPrice(parseFloat(event.target.value))} />
          <label htmlFor="max_price">Maximum Price</label>
          <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onInput={(event) => setMaxPrice(parseFloat(event.target.value))}/>
          <label htmlFor="type">Type of Property</label>
          <select id="type" name="type" class="dropdown" onInput={(event) => setType(event.target.value)}>
              <option value="" selected disabled>What type of property are you searching for?</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhome">Townhome</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Loft">Loft</option>
          </select>
          <label htmlFor="numBedrooms">Number of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" className="dropdown" onChange={(event) => setBedrooms(event.target.value)}>
              <option value="" selected disabled>How many bedrooms are you looking for?</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5 Bedrooms</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" className="dropdown" onChange={(event) => setBathrooms(event.target.value)}>
              <option value="" selected disabled>How many bathrooms are you searching for?</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
              <option value="5">5 Bathrooms</option>
          </select>
          <label htmlFor="min_size">Minimum Lot Size</label>
          <input name="min_size" id="min_size" placeholder="Minimum Lot Size (sqft.)" type="number" onInput={(event) => setMinSize(parseFloat(event.target.value))} />
          <label htmlFor="max_size">Maximum Lot Size</label>
          <input name="max_size" id="max_size" placeholder="Maximum Lot Size (sqft.)" type="number" onChange={(event) => setMaxSize(parseFloat(event.target.value))}/>
          <button className="propertySearchButton" type="submit"> Search </button>
        </form>
          <h2 class="searchResHeader">Search Results: </h2>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Price</th>
                <th>Type</th>
                <th>Lot Size</th>
                <th># of Bedrooms</th>
                <th># of Bathrooms</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => {
                return (
                  <tr>
                    <td>{result.address}</td>
                    <td>${neatlyFormatValue(result.goingPrice)}</td>
                    <td>{result.propertyType}</td>
                    <td>{neatlyFormatValue(result.propertySize)} sqft.</td>
                    <td>{result.numBedrooms}</td>
                    <td>{result.numBathrooms}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
      );
    }
  }

  return constructHTML();
}
export default PropertySearchForm
