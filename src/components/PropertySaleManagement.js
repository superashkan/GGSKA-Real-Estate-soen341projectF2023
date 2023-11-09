import {React, useState, useContext, useEffect } from 'react'
import { BuyList } from '../helpers/BuyList'
import "../styles/MultiPageCSS.css";
import Cookies from 'js-cookie';
import axios from "axios";
import {Link, useNavigate, useLocation} from "react-router-dom";

function PropertySaleManagement() {

  const navigate = useNavigate();
  const location = useLocation();
  var [price, setPrice] = useState("");
  var [size, setSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [type, setType] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");
  var [propertyList, setPropertyList] = useState([]);

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setPropertyList(result.data))
  .catch((err)=>{
    console.log(err);
  });
  
  useEffect(() => {
    getAllProperties();
 }, []);

  const neatlyFormatValue = function(value) {
    value = value.toString();
    var newValueStr = "";
    var forwardPositionCounter = 0;
    for (var i = value.length - 1;i >= 0;i--) {
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

  const handleCreation = async function(event) {
    try{
      const state = location.state;
      var brokerEmail = null;
      if (location.state != null) {
        brokerEmail = location.state.brokerEmail;
      }
      const {data} = await axios.post('/createProperty', {brokerEmail, address, price, type, bedrooms, bathrooms, size});
      alert('Property creation successful')
      return navigate('/Sell');
    }
    catch (e){
      alert(e);
    }
  }

  const handleDeletion = async function(address) {
    try {
      console.log(address);
      axios.post('/deleteProperty', {address: address})
      window.location.reload(false);
    }
    catch (e){
      alert(e);
    }
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
        <form id="search-form" onSubmit={handleCreation}>
          <label htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="Address" type="text" onInput={(event) => setAddress(event.target.value)}/>
          <label htmlFor="goingPrice">Price</label>
          <input name="goingPrice" id="goingPrice" placeholder="Price" type="number" onInput={(event) => setPrice(event.target.value)} />
          <label htmlFor="propertyType">Type of Property</label>
          <select id="propertyType" name="propertyType" defaultValue="" className="dropdown" onInput={(event) => setType(event.target.value)}>
              <option value="" disabled>Type of Property</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhome">Townhome</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Loft">Loft</option>
          </select>
          <label htmlFor="numBedrooms"># of Bedrooms</label>
          <select id="numBedrooms" name="numBedrooms" defaultValue="" className="dropdown" onInput={(event) => setBedrooms(event.target.value)}>
              <option value="" disabled># of Bedrooms</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5 Beds</option>
          </select>
          <label htmlFor="numBathrooms"># of Bathrooms</label>
          <select id="numBathrooms" name="numBathrooms" defaultValue="" className="dropdown" onInput={(event) => setBathrooms(event.target.value)}>
              <option value="" disabled># of Bathrooms</option>
              <option value="1">1 Bath</option>
              <option value="2">2 Baths</option>
              <option value="3">3 Baths</option>
              <option value="4">4 Baths</option>
              <option value="5">5 Baths</option>
          </select>
          <label htmlFor="propertySize">Lot Size</label>
          <input name="propertySize" id="propertySize" placeholder="Lot Size (sqft.)" type="number" onInput={(event) => setSize(event.target.value)} />
          <div id="errorMessage">{errorMessage}</div>
          <button className="button" type="submit"> Create Property </button>
        </form>
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
              {propertyList.map((property) => {
                return (
                  <tr>
                    <td>{property.address}</td>
                    <td>${neatlyFormatValue(property.goingPrice)}</td>
                    <td>{property.propertyType}</td>
                    <td>{neatlyFormatValue(property.propertySize)} sqft.</td>
                    <td>{property.numBedrooms}</td>
                    <td>{property.numBathrooms}</td>
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => {
                        return navigate('/EditProperty', {state: {
                          currentAddress: property.address,
                          currentPrice: property.goingPrice,
                          currentType: property.propertyType,
                          currentBedrooms: property.numBedrooms,
                          currentBathrooms: property.numBathrooms,
                          currentSize: property.propertySize
                        }});
                        }
                        }>
                        Edit
                      </button>
                    </td>
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => {
                        return navigate('/Offer', {state: {
                          currentAddress: property.address
                        }});
                        }
                        }>
                        Make Offer
                      </button>
                    </td>
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => handleDeletion(property.address)}>
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
