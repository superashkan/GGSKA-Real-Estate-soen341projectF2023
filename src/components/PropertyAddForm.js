import React, { useState } from 'react'
import { BuyList, createProperty } from '../helpers/BuyList'
import "../styles/Login.css";
//import connection from "../helpers/Database"
//import mysql from 'mysql'

function PropertyAddForm() {

  var [price, setPrice] = useState("");
  var [size, setSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [type, setType] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");
  var [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  var [propertyList, setPropertyList] = useState(BuyList);

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

  const addProperty = function() {
    const res = performChecks();
    if (res == false) {
      return;
    }
    createProperty(address, neatlyFormatValue(price), type, neatlyFormatValue(size), price, size, bedrooms, bathrooms)
  }

  const localCreateProperty = function(address, neatPrice, type, neatSize, purePrice, pureLotSize, bedrooms, bathrooms) {
    BuyList.push({
      address: address,
      price: neatPrice,
      type: type,
      lotSize: neatSize,
      purePrice: purePrice,
      pureLotSize: pureLotSize,
      bedrooms: bedrooms,
      bathrooms: bathrooms
    })
  }

  const performChecks = function() {
    if (address == "") {
      if (price == "") {
        if (bedrooms == "") {
          if (bathrooms == "") {
            if (type == "") {
              if (size == "") {
                setErrorMessage("Please input values in all fields.")
                return false;
              }
            }
          }
        }
      }
    }
    if (address == "") {
      setErrorMessage("Must input address.")
      return false;
    }
    if (price == "" || price <= 0) {
      setErrorMessage("Must input positive price.")
      return false;
    }
    if (bedrooms == "") {
      setErrorMessage("Must select number of bedrooms.")
      return false;
    }
    if (bathrooms == "") {
      setErrorMessage("Must select number of bathrooms.")
      return false;
    }
    if (type == "") {
      setErrorMessage("Must select property type.")
      return false;
    }
    if (size <= 0 || size == "") {
      setErrorMessage("Must input positive property size.");
      return false;
    }
    setErrorMessage("");
    return true;
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form">
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
          <label htmlFor="price">Price</label>
          <input name="price" id="price" placeholder="Price" type="number" onInput={(event) => setPrice(event.target.value)} />
          <label htmlFor="type">Type of Property</label>
          <select id="type" name="type" class="dropdown" onInput={(event) => setType(event.target.value)}>
              <option value="" selected disabled># of Bathrooms</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhome">Townhome</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Loft">Loft</option>
          </select>
          <label htmlFor="numBedrooms"># of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" class="dropdown" onInput={(event) => setBedrooms(event.target.value)}>
              <option value="" selected disabled># of Bedrooms</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5 Beds</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" class="dropdown" onInput={(event) => setBathrooms(event.target.value)}>
              <option value="" selected disabled># of Bathrooms</option>
              <option value="1">1 Bath</option>
              <option value="2">2 Baths</option>
              <option value="3">3 Baths</option>
              <option value="4">4 Baths</option>
              <option value="5">5 Baths</option>
          </select>
          <label htmlFor="size">Lot Size</label>
          <input name="size" id="size" placeholder="Lot Size (sqft.)" type="number" onInput={(event) => setSize(event.target.value)} />
          <label htmlFor="buyOrRent">Is this property for buying or renting?</label>
          <select id="buyOrRent" name="buyOrRent" class="dropdown" onInput={(event) => setBuyOrRent(event.target.value)}>
              <option value="" selected disabled>Buyable or Rentable?</option>
              <option value="Buyable">Buying</option>
              <option value="Rentable">Renting</option>
          </select>
          <div id="errorMessage">{errorMessage}</div>
        </form>
        <button className="form button" onClick={event => addProperty()}> Test Add Property </button>
        <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>Price</th>
                <th>Type</th>
                <th>Lot Size</th>
                <th># of Bedrooms</th>
                <th># of Bathrooms</th>
              </tr>
            </thead>
            <tbody>
              {BuyList.map((property) => {
                return (
                  <tr>
                    <td>{property.id}</td>
                    <td>{property.address}</td>
                    <td>${neatlyFormatValue(property.purePrice)}</td>
                    <td>{property.type}</td>
                    <td>{neatlyFormatValue(property.pureLotSize)} sqft.</td>
                    <td>{property.bedrooms}</td>
                    <td>{property.bathrooms}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
      );
    }

  return constructHTML();
}
export default PropertyAddForm
