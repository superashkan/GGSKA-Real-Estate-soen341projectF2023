import {React, useState, useContext, useEffect } from 'react'
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function PropertyEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentAddress = location.state.currentAddress;
  const currentPrice = location.state.currentPrice;
  const currentBedrooms = location.state.currentBedrooms;
  const currentBathrooms = location.state.currentBathrooms;
  const currentType = location.state.currentType;
  const currentSize = location.state.currentSize;
  var [newPrice, setNewPrice] = useState("");
  var [newSize, setNewSize] = useState("");
  var [newBedrooms, setNewBedrooms] = useState("");
  var [newBathrooms, setNewBathrooms] = useState("");
  var [newAddress, setNewAddress] = useState("");
  var [newType, setNewType] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const handleEdit = async function(event) {
    try{
        if (isNullOrEmpty(newAddress)) {
            newAddress = currentAddress;
        }
        if (isNullOrEmpty(newPrice)) {
            newPrice = currentPrice;
        }
        if (isNullOrEmpty(newType)) {
            newType = currentType;
        }
        if (isNullOrEmpty(newSize)) {
            newSize = currentSize;
        }
        if (isNullOrEmpty(newBedrooms)) {
            newBedrooms = currentBedrooms;
        }
        if (isNullOrEmpty(newBathrooms)) {
            newBathrooms = currentBathrooms;
        }
      const {data} = await axios.post('/editProperty', {currentAddress, newAddress, newPrice, newType, newBedrooms, newBathrooms, newSize});
      console.log("data: ");
      console.log(data);
      alert('Property edit successful');
      return navigate('/Sell');
    }
    catch (e){
      alert(e);
    }
  }

  const performChecks = function() {
    if (newAddress == "") {
      if (newPrice == "") {
        if (newBedrooms == "") {
          if (newBathrooms == "") {
            if (newType == "") {
              if (newSize == "") {
                setErrorMessage("Please input values in all fields.")
                return false;
              }
            }
          }
        }
      }
    }
    if (newAddress == "") {
      setErrorMessage("Must input address.")
      return false;
    }
    if (newPrice == "" || newPrice <= 0) {
      setErrorMessage("Must input positive price.")
      return false;
    }
    if (newBedrooms == "") {
      setErrorMessage("Must select number of bedrooms.")
      return false;
    }
    if (newBathrooms == "") {
      setErrorMessage("Must select number of bathrooms.")
      return false;
    }
    if (newType == "") {
      setErrorMessage("Must select property type.")
      return false;
    }
    if (newSize <= 0 || newSize == "") {
      setErrorMessage("Must input positive property size.");
      return false;
    }
    setErrorMessage("");
    return true;
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form" onSubmit={handleEdit}>
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" defaultValue={currentAddress} type="text" onInput={(event) => setNewAddress(event.target.value)}/>
          <label htmlFor="goingPrice">Price</label>
          <input name="goingPrice" id="goingPrice" placeholder="Price" defaultValue={currentPrice} type="number" onInput={(event) => setNewPrice(event.target.value)} />
          <label htmlFor="propertyType">Type of Property</label>
          <select id="propertyType" name="propertyType" className="dropdown" defaultValue={currentType} onInput={(event) => setNewType(event.target.value)}>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhome">Townhome</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Loft">Loft</option>
          </select>
          <label htmlFor="numBedrooms"># of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" className="dropdown" defaultValue={currentBedrooms} onInput={(event) => setNewBedrooms(event.target.value)}>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5 Beds</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" className="dropdown" defaultValue={currentBathrooms} onInput={(event) => setNewBathrooms(event.target.value)}>
              <option value="1">1 Bath</option>
              <option value="2">2 Baths</option>
              <option value="3">3 Baths</option>
              <option value="4">4 Baths</option>
              <option value="5">5 Baths</option>
          </select>
          <label htmlFor="propertySize">Lot Size</label>
          <input name="propertySize" id="propertySize" placeholder="Lot Size (sqft.)" defaultValue={currentSize} type="number" onInput={(event) => setNewSize(event.target.value)} />
          <div id="errorMessage">{errorMessage}</div>
          <button className="button" type="submit"> Edit Property </button>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default PropertyEditForm
