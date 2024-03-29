import {React, useState} from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import { isNullOrEmpty } from '../../helpers/HelperFunctions';

function PropertyEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentAddress = location.state ? location.state.currentAddress : null;
  const currentPrice = location.state ? location.state.currentPrice : null;
  const currentBedrooms = location.state ? location.state.currentBedrooms : null;
  const currentBathrooms = location.state ? location.state.currentBathrooms : null;
  const currentType = location.state ? location.state.currentType : null;
  const currentSize = location.state ? location.state.currentSize : null;
  const currentBuyOrRent = location.state ? location.state.currentBuyOrRent : null;
  const currentPropertyImageURL = location.state ? location.state.currentPropertyImageURL : null;
  let [newPrice, setNewPrice] = useState("");
  let [newSize, setNewSize] = useState("");
  let [newBedrooms, setNewBedrooms] = useState("");
  let [newBathrooms, setNewBathrooms] = useState("");
  let [newAddress, setNewAddress] = useState("");
  let [newType, setNewType] = useState("");
  let [newBuyOrRent, setNewBuyOrRent] = useState("");
  let [newPropertyImageURL, setNewPropertyImageURL] = useState("");
  let [errorMessage, setErrorMessage] = useState("Please input values in all fields.");

  const handleEdit = async function(event) {
    try{
        event.preventDefault();
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
        if (isNullOrEmpty(newBuyOrRent)) {
          newBuyOrRent = currentBuyOrRent;
        }
        if (isNullOrEmpty(newPropertyImageURL)) {
          newPropertyImageURL = currentPropertyImageURL;
        }
        let isEditOkay = performChecks();
        if (!isEditOkay) {
          return;
        }
      axios.post('/editProperty', {currentAddress, newAddress, newPrice, newType, newBedrooms, newBathrooms, newSize, newBuyOrRent, newPropertyImageURL})
      .catch((err)=>{
        console.log(err);
      });
      alert('Property edit successful');
      return navigate('/BrokerProfile');
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
                alert("Please input values in all fields.")
                return false;
              }
            }
          }
        }
      }
    }
    if (newAddress == "") {
      alert("Must input address.")
      return false;
    }
    if (newPrice == "" || newPrice <= 0) {
      alert("Must input positive price.")
      return false;
    }
    if (newBedrooms == "") {
      alert("Must select number of bedrooms.")
      return false;
    }
    if (newBathrooms == "") {
      alert("Must select number of bathrooms.")
      return false;
    }
    if (newType == "") {
      alert("Must select property type.")
      return false;
    }
    if (newSize <= 0 || newSize == "") {
      alert("Must input positive property size.");
      return false;
    }
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
          <label htmlFor="buyOrRent">Is this property for buying or renting?</label>
          <select id="buyOrRent" name="buyOrRent" class="dropdown" defaultValue={currentBuyOrRent} onInput={(event) => setNewBuyOrRent(event.target.value)}>
              <option value="Buyable">Buying</option>
              <option value="Rentable">Renting</option>
          </select>
          <label htmlFor="propertyImageURL">URL of Image of Property</label>
          <input id="propertyImageURL" name="propertyImageURL" defaultValue={currentPropertyImageURL} placeholder="URL of image to be used for property" onInput={(event) => setNewPropertyImageURL(event.target.value)} />
          <button className="button" type="submit"> Edit Property </button>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default PropertyEditForm
