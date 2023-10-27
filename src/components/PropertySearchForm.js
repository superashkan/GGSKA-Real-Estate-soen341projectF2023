import React, { useState } from 'react'
import { BuyList } from '../helpers/BuyList'
import "../styles/Login.css";
import "../styles/Search.css"
import Cookies from 'js-cookie';

function PropertySearchForm() {

  var [minPrice, setMinPrice] = useState("");
  var [maxPrice, setMaxPrice] = useState("");
  var [minSize, setMinSize] = useState("");
  var [maxSize, setMaxSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please enter at least one search criterion");
  var [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  var [propertyList, setPropertyList] = useState(Cookies.get('propertyList') ? JSON.parse(Cookies.get('propertyList')) : BuyList);
  var [results, setResults] = useState([]);

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

  const addressCheck = function(event) {
    setAddress(event.target.value, () => {
      console.log(address);
    });
    performChecks();
  }

  const bedroomsCheck = function(event) {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    setBedrooms(parseInt(event.target.value));
    performChecks();
  }

  const bathroomsCheck = function(event) {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    setBathrooms(parseInt(event.target.value));
    performChecks();
  }

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const performSearch = function() {
    var resultsList = propertyList;
    const res = performChecks();
    if (res == false) {
      results = [];
      return;
    }
    if (bedrooms == "noselection") {
      bedrooms = "";
    }
    if (bathrooms == "noselection") {
      bathrooms = "";
    }
    if (!isNullOrEmpty(address)) {
      resultsList = resultsList.filter(function(property) {
        return property.address.toLowerCase().includes(address.toLowerCase());
      });
    }
    if (!isNullOrEmpty(maxSize)) {
      resultsList = resultsList.filter(function(property) {
        return property.pureLotSize <= maxSize;
      });
    }
    if (!isNullOrEmpty(minSize)) {
      resultsList = resultsList.filter(function(property) {
        return property.pureLotSize >= minSize;
      });
    }
    if (!isNullOrEmpty(maxPrice)) {
      resultsList = resultsList.filter(function(property) {
        return parseFloat(property.purePrice) <= maxPrice;
      });
    }
    if (!isNullOrEmpty(minPrice)) {
      resultsList = resultsList.filter(function(property) {
        return parseFloat(property.purePrice) >= minPrice;
      });
    }
    if (!isNullOrEmpty(bedrooms)) {
      resultsList = resultsList.filter(function(property) {
        return property.bedrooms == bedrooms;
      });
    }
    if (!isNullOrEmpty(bathrooms)) {
      resultsList = resultsList.filter(function(property) {
        return property.bathrooms == bathrooms;
      });
    }
    setResults(resultsList);
  }

  const performChecks = function() {
    if (address == "") {
      if (minPrice == 0 || minPrice == "") {
        if (maxPrice == 0 || maxPrice == "") {
          if (bedrooms == "") {
            if (bathrooms == "") {
              if (minSize == 0 || minSize == "") {
                if (maxSize == 0 || maxSize == "") {
                  setErrorMessage("Please enter at least one search criterion.");
                  setIsSearchButtonDisabled(true)
                  return false;
                }
              }
            }
          }
        }
      }
    }
    if (minPrice < 0.00) {
      setErrorMessage("Minimum price must not be negative.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (maxPrice < 0.00) {
      setErrorMessage("Maximum price must not be negative.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (minSize < 0.00) {
      setErrorMessage("Minimum property size must not be negative.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (maxSize < 0.00) {
      setErrorMessage("Maximum size must not be negative.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (bedrooms != "" && (bedrooms < 1 || bedrooms > 5)) {
      setErrorMessage("If choosing a number of bedrooms, please choose a number between 1 and 5.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (bathrooms != "" && (bathrooms < 1 || bathrooms > 5)) {
      setErrorMessage("If choosing a number of bathrooms, please choose a number between 1 and 5.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if ((minPrice == 0 && maxPrice == 0) && (minPrice.toString() != '' && maxPrice.toString() != '')) {
      setErrorMessage("Please choose a minimum or maximum price.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if ((minSize == 0 && maxSize == 0) && (minSize.toString() != '' && maxSize.toString() != '')) {
      setErrorMessage("Please choose a minimum or maximum lot size.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (minPrice > maxPrice && maxPrice != '') {
      setErrorMessage("Maximum price must be greater than minimum price.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (minSize > maxSize  && maxSize != '') {
      setErrorMessage("Maximum lot size must be greater than minimum lot size.");
      setIsSearchButtonDisabled(true);
      return false;
    }
    if (maxPrice == 0 && maxPrice.toString() != '') {
      setErrorMessage("Maximum price must be greater than $0");
      setIsSearchButtonDisabled(true);
      return false;
    }
    setErrorMessage("");
    setIsSearchButtonDisabled(false);
    return true;
  }

  const checkIfValueNegative = function(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (event.target.id == "min_price") {
      setMinPrice(parseFloat(event.target.value));
    }
    if (event.target.id == "max_price") {
      setMaxPrice(parseFloat(event.target.value));
    }
    if (event.target.id == "min_size") {
      setMinSize(parseFloat(event.target.value));
    }
    if (event.target.id == "max_size") {
      setMaxSize(parseFloat(event.target.value));
    }
    performChecks();
  }

  const constructHTML = function() {
    if (results.length == 0) {
      return (
        <div>
        <form id="search-form">
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
          <label htmlFor="min_price">Minimum Price</label>
          <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onInput={(event) => setMinPrice(event.target.value)} />
          <label htmlFor="max_price">Maximum Price</label>
          <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onInput={(event) => setMaxPrice(event.target.value)}/>
          <label htmlFor="numBedrooms"># of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" className="dropdown" onChange={(event) => setBedrooms(event.target.value)}>
              <option value="" selected disabled># of Bedrooms</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5 Beds</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" className="dropdown" onChange={(event) => setBathrooms(event.target.value)}>
              <option value="" selected disabled># of Bathrooms</option>
              <option value="noselection">No Selection</option>
              <option value="1">1 Bath</option>
              <option value="2">2 Baths</option>
              <option value="3">3 Baths</option>
              <option value="4">4 Baths</option>
              <option value="5">5 Baths</option>
          </select>
          <label htmlFor="min_price">Minimum Lot Size</label>
          <input name="min_size" id="min_size" placeholder="Minimum Lot Size (sqft.)" type="number" onInput={(event) => setMinSize(event.target.value)} />
          <label htmlFor="max_price">Maximum Lot Size</label>
          <input name="max_size" id="max_size" placeholder="Maximum Lot Size (sqft.)" type="number" onChange={(event) => setMaxSize(event.target.value)}/>
          <div id="errorMessage">{errorMessage}</div>
        </form>
        <button className="form button" onClick={event => performSearch()}> Test Search </button>
        </div>
      );
    } else {
      return (
        <div>
          <form id="search-form">
            <label htmlFor="address">Address</label>
            <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
            <label htmlFor="min_price">Minimum Price</label>
            <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onInput={(event) => setMinPrice(event.target.value)} />
            <label htmlFor="max_price">Maximum Price</label>
            <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onInput={(event) => setMaxPrice(event.target.value)}/>
            <label htmlFor="numBedrooms"># of Bedrooms</label>
            <select id="numBedrooms" name="numBedrooms" className="dropdown" onChange={(event) => setBedrooms(event.target.value)}>
                <option value="" selected disabled># of Bedrooms</option>
                <option value="noselection">No Selection</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5">5 Beds</option>
            </select>
            <label htmlFor="numBathrooms"># of Bathrooms</label>
            <select id="numBathrooms" name="numBathrooms" className="dropdown" onChange={(event) => setBathrooms(event.target.value)}>
                <option value="" selected disabled># of Bathrooms</option>
                <option value="noselection">No Selection</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3 Baths</option>
                <option value="4">4 Baths</option>
                <option value="5">5 Baths</option>
            </select>
            <label htmlFor="min_price">Minimum Lot Size</label>
            <input name="min_size" id="min_size" placeholder="Minimum Lot Size (sqft.)" type="number" onInput={(event) => setMinSize(event.target.value)} />
            <label htmlFor="max_price">Maximum Lot Size</label>
            <input name="max_size" id="max_size" placeholder="Maximum Lot Size (sqft.)" type="number" onChange={(event) => setMaxSize(event.target.value)}/>
            <div id="errorMessage">{errorMessage}</div>
          </form>
          <table className="results-table">
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
                    <td>${neatlyFormatValue(result.purePrice)}</td>
                    <td>{result.type}</td>
                    <td>{neatlyFormatValue(result.pureLotSize)} sqft.</td>
                    <td>{result.bedrooms}</td>
                    <td>{result.bathrooms}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
          <button className="form button" onClick={event => performSearch()}> Test Search </button>
        </div>
      );
    }
  }

  return constructHTML();
}
export default PropertySearchForm
