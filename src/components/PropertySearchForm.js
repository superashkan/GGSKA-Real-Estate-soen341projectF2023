import React, { useState } from 'react'
import { BuyList } from '../helpers/BuyList'
//import mysql from 'mysql'

function PropertySearchForm() {
  // var [state, setState] = useState({
  //   minPrice: "",
  //   maxPrice: "",
  //   errorMessage: "Please enter at least one search criterion",
  //   isSearchButtonDisabled: true
  // });
  //
  // const performChecks = () => {
  //   if (minPrice < 0) {
  //     minPrice = 0;
  //   }
  //   if (maxPrice < 0) {
  //     maxPrice = 0;
  //   }
  //   if (minPrice == 0 && maxPrice == 0) {
  //     errorMessage = "Please choose a minimum or maximum price."
  //     isSearchButtonDisabled = true;
  //   }
  //   else if (minPrice > maxPrice) {
  //     errorMessage = "Maximum price must be greater than minumum price."
  //     isSearchButtonDisabled = true;
  //   }
  //   else if (maxPrice == 0) {
  //     errorMessage = "Maximum price must be greater than $0"
  //     isSearchButtonDisabled = true;
  //   }
  //   else {
  //     errorMessage=""
  //     isSearchButtonDisabled = false;
  //   }
  // }

  var [minPrice, setMinPrice] = useState("");
  var [maxPrice, setMaxPrice] = useState("");
  var [minSize, setMinSize] = useState("");
  var [maxSize, setMaxSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please enter at least one search criterion");
  var [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  var [results, setResults] = useState([]);

  const addressCheck = async function(event) {
    await setAddress(event.target.value);
    console.log(address);
    await performChecks();
  }

  const bedroomsCheck = async function(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    await setBedrooms(parseInt(event.target.value));
    await performChecks();
  }

  const bathroomsCheck = async function(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    await setBathrooms(parseInt(event.target.value));
    await performChecks();
  }

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const performSearch = async function() {
    var resultsList = BuyList;
    if (!isNullOrEmpty(address)) {
      resultsList = resultsList.filter(function(property) {
        return property.address.toLowerCase().includes(address.toLowerCase());
      });
    }
    if (!isNullOrEmpty(maxSize)) {
      resultsList = resultsList.filter(function(property) {
        return property.lotSize <= maxSize;
      });
    }
    if (!isNullOrEmpty(minSize)) {
      resultsList = resultsList.filter(function(property) {
        return property.lotSize >= minSize;
      });
    }
    if (!isNullOrEmpty(maxPrice)) {
      resultsList = resultsList.filter(function(property) {
        return property.price <= maxPrice;
      });
    }
    if (!isNullOrEmpty(minPrice)) {
      resultsList = resultsList.filter(function(property) {
        return property.price >= minPrice;
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
    await setResults(resultsList);
  }

  const performChecks = async function() {
    if (address == "") {
      if (minPrice == 0 || minPrice == "") {
        if (maxPrice == 0 || maxPrice == "") {
          if (bedrooms == "") {
            if (bathrooms == "") {
              if (minSize == 0 || minSize == "") {
                if (maxSize == 0 || maxSize == "") {
                  await setErrorMessage("Please enter at least one search criterion.");
                  await setIsSearchButtonDisabled(true)
                  return;
                }
              }
            }
          }
        }
      }
    }
    else if (bedrooms != "" && (bedrooms < 1 || bedrooms > 5)) {
      await setErrorMessage("If choosing a number of bedrooms, please choose a number between 1 and 5.");
      await setIsSearchButtonDisabled(true)
    }
    else if (bathrooms != "" && (bathrooms < 1 || bathrooms > 5)) {
      await setErrorMessage("If choosing a number of bathrooms, please choose a number between 1 and 5.");
      await setIsSearchButtonDisabled(true)
    }
    else if ((minPrice == 0 && maxPrice == 0) && (minPrice.toString() != '' && maxPrice.toString() != '')) {
      await setErrorMessage("Please choose a minimum or maximum price.");
      await setIsSearchButtonDisabled(true)
    }
    else if ((minSize == 0 && maxSize == 0) && (minSize.toString() != '' && maxSize.toString() != '')) {
      await setErrorMessage("Please choose a minimum or maximum lot size.");
      await setIsSearchButtonDisabled(true)
    }
    else if (minPrice > maxPrice) {
      await setErrorMessage("Maximum price must be greater than minimum price.");
      await setIsSearchButtonDisabled(true)
    }
    else if (minSize > maxSize) {
      await setErrorMessage("Maximum lot size must be greater than minimum lot size.");
      await setIsSearchButtonDisabled(true)
    }
    else if (maxPrice == 0 && maxPrice.toString() != '') {
      await setErrorMessage("Maximum price must be greater than $0");
      await setIsSearchButtonDisabled(true);
    }
    else {
      await setErrorMessage("");
      await setIsSearchButtonDisabled(false);
      await performSearch();
    }
  }

  const checkIfValueNegative = async function(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    if (event.target.id == "min_price") {
      await setMinPrice(event.target.value);
    }
    if (event.target.id == "max_price") {
      await setMaxPrice(event.target.value);
    }
    if (event.target.id == "min_size") {
      await setMinSize(event.target.value);
    }
    if (event.target.id == "max_size") {
      await setMaxSize(event.target.value);
    }
    await performChecks();
  }

  return (
    <div>
      <form id="search-form">
        <label htmlFor="address">Address</label>
        <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => addressCheck(event)}/>
        <label htmlFor="min_price">Minimum Price</label>
        <input name="min_price" id="min_price" placeholder="Minimum price" type="number" onInput={(event) => checkIfValueNegative(event)} />
        <label htmlFor="max_price">Maximum Price</label>
        <input name="max_price" id="max_price" placeholder="Maximum price" type="number" onInput={(event) => checkIfValueNegative(event)}/>
        <label htmlFor="numBedrooms"># of Bedrooms</label>
        <input id="numBedrooms" name="numBedrooms" placeholder="# of bedrooms (1 to 5)" type="number" onInput={(event) => bedroomsCheck(event)} />
        <label htmlFor="numBathrooms"># of Bathrooms</label>
        <input id="numBathrooms" name="numBathrooms" placeholder="# of bathrooms (1 to 5)" type="number" onInput={(event) => bathroomsCheck(event)} />
        <label htmlFor="min_price">Minimum Lot Size</label>
        <input name="min_size" id="min_size" placeholder="Minimum Lot Size (sqft.)" type="number" onInput={(event) => checkIfValueNegative(event)} />
        <label htmlFor="max_price">Maximum Lot Size</label>
        <input name="max_size" id="max_size" placeholder="Maximum Lot Size (sqft.)" type="number" onInput={(event) => checkIfValueNegative(event)}/>
        <div id="errorMessage">{errorMessage}</div>
        <button type="submit" disabled={isSearchButtonDisabled}> Search </button>
      </form>

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
                <td>{result.price}</td>
                <td>{result.type}</td>
                <td>{result.lotSize}</td>
                <td>{result.bedrooms}</td>
                <td>{result.bathrooms}</td>
              </tr>
            )})
          }
        </tbody>
      </table>
    </div>
  )
}

export default PropertySearchForm
