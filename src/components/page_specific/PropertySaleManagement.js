import {React, useState, useContext, useEffect } from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import { neatlyFormatValue } from '../../helpers/HelperFunctions';

function PropertySaleManagement() {

  const navigate = useNavigate();
  const location = useLocation();
  var [price, setPrice] = useState("");
  var [size, setSize] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [address, setAddress] = useState("");
  var [type, setType] = useState("");
  var [buyOrRent, setBuyOrRent] = useState("");
  var [propertyImageURL, setPropertyImageURL] = useState("");
  var [propertyList, setPropertyList] = useState([]);

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setPropertyList(result.data))
  .catch((err)=>{
    console.log(err);
  });
  
  useEffect(() => {
    getAllProperties();
 });

  const handleCreation = async function(event) {
    try{
      var isCreationOkay = performChecks();
      if (!isCreationOkay) {
        event.preventDefault();
        return;
      }
      const state = location.state;
      var brokerEmail = null;
      if (location.state != null) {
        brokerEmail = location.state.brokerEmail;
      }
      const {data} = await axios.post('/createProperty', {brokerEmail, address, price, type, bedrooms, bathrooms, size, buyOrRent, propertyImageURL});
      alert('Property creation successful')
      return navigate('/Sell');
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
                alert("Please input values in all fields.")
                return false;
              }
            }
          }
        }
      }
    }
    if (address == "") {
      alert("Must input address.")
      return false;
    }
    if (price == "" || price <= 0) {
      alert("Must input positive price.")
      return false;
    }
    if (bedrooms == "") {
      alert("Must select number of bedrooms.")
      return false;
    }
    if (bathrooms == "") {
      alert("Must select number of bathrooms.")
      return false;
    }
    if (type == "") {
      alert("Must select property type.")
      return false;
    }
    if (size <= 0 || size == "") {
      alert("Must input positive property size.");
      return false;
    }
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
          <label htmlFor="buyOrRent">Is this property for buying or renting?</label>
          <select id="buyOrRent" name="buyOrRent" class="dropdown" onInput={(event) => setBuyOrRent(event.target.value)}>
              <option value="" selected disabled>Buyable or Rentable?</option>
              <option value="Buyable">Buying</option>
              <option value="Rentable">Renting</option>
          </select>
          <label htmlFor="propertyImageURL">URL of Image of Property</label>
          <input id="propertyImageURL" name="propertyImageURL" placeholder="URL of image to be used for property" onInput={(event) => setPropertyImageURL(event.target.value)} />
          <button className="button" type="submit"> Create Property </button>
        </form>
        <div class="soldPropertiesTitle">
          <h1> Properties for Sale </h1>
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
              </tr>
            </thead>
            <tbody>
              {propertyList.map((property) => {
                if (property.forRentOrPurchase == "Buyable") {
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
                        return navigate('/Offer', {state: {
                          currentAddress: property.address
                        }});
                        }
                        }>
                        Make Offer
                      </button>
                    </td>
                  </tr>
                )
              }})
              }
            </tbody>
          </table>
          <br />
          <div class="soldPropertiesTitle">
          <h1> Properties for Rent </h1>
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
                if (property.forRentOrPurchase == "Rentable") {
                return (
                  <tr>
                    <td>{property.address}</td>
                    <td>${neatlyFormatValue(property.goingPrice)}</td>
                    <td>{property.propertyType}</td>
                    <td>{neatlyFormatValue(property.propertySize)} sqft.</td>
                    <td>{property.numBedrooms}</td>
                    <td>{property.numBathrooms}</td>
                  </tr>
                )
              }})
              }
            </tbody>
          </table>
        </div>
      );
    }

  return constructHTML();
}
export default PropertySaleManagement
