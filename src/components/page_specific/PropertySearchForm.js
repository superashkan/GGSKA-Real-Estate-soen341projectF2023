import React, { useState, useEffect } from 'react'
import "../../static/css/MultiPageCSS.css";
import "../../static/css/Search.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { neatlyFormatValue, isNullOrEmpty } from '../../helpers/HelperFunctions';

function PropertySearchForm() {

  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [type, setType] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [address, setAddress] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async function(event) {
    event.preventDefault();
    try{
      var isSearchOkay = performChecks();
      if (!isSearchOkay) {
        return;
      }
      axios.post('/searchProperties', {address,maxSize,minSize,maxPrice,minPrice,bedrooms,bathrooms,type}).then((response) => {
        setResults(response.data);
        console.log(response);
      })
      .catch((err)=>{
        console.log(err);
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
                    alert("Please enter at least one search criterion.");
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
      alert("Minimum price must not be negative.");
      setResults([]);
      return false;
    }
    if (maxPrice <= 0.00 && maxPrice.toString() != '') {
      alert("Maximum price must be positive.");
      setResults([]);
      return false;
    }
    if (minSize < 0.00) {
      alert("Minimum property size must not be negative.");
      setResults([]);
      return false;
    }
    if (maxSize <= 0.00 && maxSize.toString() != '') {
      alert("Maximum property size must be positive.");
      setResults([]);
      return false;
    }
    if ((minPrice == 0 && maxPrice == 0) && (minPrice.toString() != '' && maxPrice.toString() != '')) {
      alert("Please choose a minimum or maximum price.");
      setResults([]);
      return false;
    }
    if ((minSize == 0 && maxSize == 0) && (minSize.toString() != '' && maxSize.toString() != '')) {
      alert("Please choose a minimum or maximum lot size.");
      setResults([]);
      return false;
    }
    if (minPrice > maxPrice && maxPrice != '') {
      alert("Maximum price must be greater than minimum price.");
      setResults([]);
      return false;
    }
    if (minSize > maxSize  && maxSize != '') {
      alert("Maximum lot size must be greater than minimum lot size.");
      setResults([]);
      return false;
    }
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
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => {
                        if (result.forRentOrPurchase === 'Buyable') {
                          return navigate('/buy_listing', {state: {
                            address: result.address
                          }});
                        }
                        if (result.forRentOrPurchase === 'Rentable') {
                          return navigate('/rent_listing', {state: {
                            address: result.address
                          }});
                        }
                      }
                      }>
                        View Listing
                      </button>
                    </td>
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
