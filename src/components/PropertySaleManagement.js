import React, { useState } from 'react'
import { BuyList } from '../helpers/BuyList'
import "../styles/MultiPageCSS.css";
import Cookies from 'js-cookie';

function PropertySaleManagement() {

  var [price, setPrice] = useState("");
  var [size, setSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [type, setType] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");
  var [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  var [propertyList, setPropertyList] = useState(Cookies.get('propertyList') ? JSON.parse(Cookies.get('propertyList')) : BuyList);

  const neatlyFormatValue = function(value) {
    var newValueStr = "";
    var forwardPositionCounter = 0;
    for (var i = value.toString().length - 1;i >= 0;i--) {
      if (!value.toString().includes(".")) {
        if (forwardPositionCounter % 3 == 0 && forwardPositionCounter > 0) {
          newValueStr = "," + newValueStr;
        }
      } else {
        if (forwardPositionCounter % 3 && forwardPositionCounter > 0) {
          if ((newValueStr[i] != "," && newValueStr[i + 1] != ",") && (newValueStr[i + 2] != "," && newValueStr[i + 3] != ",")) {
            if ((value.toString()[i] != "." && value.toString()[i + 1] != ".") && (value.toString()[i + 2] != "." && value.toString()[i + 3] != ".")) {
              newValueStr = "," + newValueStr;
            }
          }
        }
        if (newValueStr.length > 6) {

        }
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

  const createProperty = function(address, neatPrice, type, neatSize, purePrice, pureLotSize, bedrooms, bathrooms) {
    propertyList.push({
      address: address,
      price: neatPrice,
      type: type,
      lotSize: neatSize,
      purePrice: purePrice,
      pureLotSize: pureLotSize,
      bedrooms: bedrooms,
      bathrooms: bathrooms
    })
    console.log(propertyList.length)
    Cookies.set('propertyList', JSON.stringify(propertyList), { expires: 400 });
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
              <option value="" selected disabled>Type of Property</option>
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
          <div id="errorMessage">{errorMessage}</div>
        </form>
        <button className="button" onClick={event => addProperty()}> Add Property </button>
        <div class="soldPropertiesTitle">
          <h1>Manage Sold Properties</h1>
        </div>
        <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Price</th>
                <th>Type</th>
                <th>Lot Size</th>
                <th># of Bedrooms</th>
                <th># of Bathrooms</th>
                <th className="emptyCell"></th>
              </tr>
            </thead>
            <tbody>
              {propertyList.map((property, index) => {
                return (
                  <tr>
                    <td>{property.address}</td>
                    <td>${neatlyFormatValue(property.purePrice)}</td>
                    <td>{property.type}</td>
                    <td>{neatlyFormatValue(property.pureLotSize)} sqft.</td>
                    <td>{property.bedrooms}</td>
                    <td>{property.bathrooms}</td>
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) =>
                        {
                          var newList = [];
                          for (var i = 0;i < propertyList.length;i++) {
                            if (i != index) {
                              newList.push(propertyList[i]);
                            }
                          }
                          setPropertyList(newList);
                          Cookies.set('propertyList', JSON.stringify(newList), { expires: 400 });
                        }}>
                        Delete Property
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

  return constructHTML();
}
export default PropertySaleManagement
