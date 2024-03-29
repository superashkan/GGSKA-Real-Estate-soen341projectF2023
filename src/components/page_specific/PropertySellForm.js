import {React, useState, useEffect } from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function PropertySellForm() {

  const navigate = useNavigate();
  const location = useLocation();
  let [price, setPrice] = useState("");
  let [size, setSize] = useState("");
  let [bedrooms, setBedrooms] = useState("");
  let [bathrooms, setBathrooms] = useState("");
  let [address, setAddress] = useState("");
  let [type, setType] = useState("");
  let [buyOrRent, setBuyOrRent] = useState("");
  let [propertyImageURL, setPropertyImageURL] = useState("");
  let [propertyList, setPropertyList] = useState([]);

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setPropertyList(result.data))
  .catch((err)=>{
    console.log(err);
  });
  
  useEffect(() => {
    if (propertyList.length === 0) {
      getAllProperties();
    }
 });

  const handleCreation = async function(event) {
    event.preventDefault();
    try{
      let isCreationOkay = performChecks();
      if (!isCreationOkay) {
        return;
      }
      const state = location.state;
      let brokerEmail = null;
      if (location.state != null) {
        brokerEmail = location.state.brokerEmail;
      }
      const {data} = await axios.post('/createProperty', {brokerEmail, address, price, type, bedrooms, bathrooms, size, buyOrRent, propertyImageURL});
      alert('Property creation successful')
      return navigate('/BrokerProfile');
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
        </div>
      );
    }

  return constructHTML();
}
export default PropertySellForm
