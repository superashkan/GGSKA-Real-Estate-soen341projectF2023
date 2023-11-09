import {React, useState, useEffect} from 'react';
import '../styles/Listing.css';
import "../styles/MultiPageCSS.css";
import { BuyList } from '../helpers/BuyList';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BuyListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyAddress = location.state.address;
  var [address, setAddress] = useState("");
  var [price, setPrice] = useState("");
  var [type, setType] = useState("");
  var [size, setSize] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [imageURL, setImageURL] = useState("");
  var [visitList, setVisitList] = useState([]);

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

  const findOffersByAddress = () => {
    axios.post('/findPropertyByAddress', {propertyAddress: propertyAddress}).then(result => {
      setAddress(result.data.address);
      setPrice(result.data.goingPrice);
      setType(result.data.propertyType);
      setBathrooms(result.data.numBathrooms);
      setBedrooms(result.data.numBedrooms);
      setSize(result.data.propertySize);
      setImageURL(result.data.propertyImageURL);
    });
  }

  const findVisitsByAddress = () => {
    axios.post('/findVisitsByAddress', {propertyAddress: propertyAddress}).then(result => {
      setVisitList(result.data);
    });
  }
  
  useEffect(() => {
    console.log(propertyAddress);
    findOffersByAddress();
    findVisitsByAddress();
 }, []);

  return (
    <div className="listing">
      <h1>Address: {address}</h1>
      <div className="listing-body">
        <div>
          <p>Price: {'$' + neatlyFormatValue(price)}</p>
          <p>Type: {type}</p>
          <p>Lot Size: {neatlyFormatValue(size) + " sqft."}</p>
          <p>Bedrooms: {bedrooms}</p>
          <p>Bathrooms: {bathrooms}</p>
        </div>
        <div>
          <img src={imageURL} alt="Property Image" style={{ marginBottom: '10px', marginTop: '10px'}} />
        </div>
      </div>
      <button className="deleteProperty" onClick = {(event) => {
                        return navigate('/RequestVisitPage', {state: {
                          address: address
                        }});
                        }
                        }>
                        Request a Visit
                      </button>
      <br />
      <h1>Scheduled Visits</h1>
      <table>
        <tr>
          <th>Visitor Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
        {visitList.map((visit) => {
        return (
          <tr>
            <td>{visit.visitorFullName}</td>
            <td>{visit.visitDate}</td>
            <td>{visit.visitTime}</td>
          </tr>
        )})
        }
      </table>
    </div>
  );
}

export default BuyListing;