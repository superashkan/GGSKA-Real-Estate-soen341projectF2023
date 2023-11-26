import {React, useState, useEffect} from 'react';
import '../static/css/Listing.css';
import "../static/css/MultiPageCSS.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { neatlyFormatValue } from '../helpers/HelperFunctions';

function RentListing() {
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

  const findVisitsByAddress = () => {
    axios.post('/findVisitsByAddress', {propertyAddress: propertyAddress}).then(result => {
      setVisitList(result.data);
    });
  }

  const findPropertyByAddress = () => {
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
  
  useEffect(() => {
    console.log(propertyAddress);
    findVisitsByAddress();
    findPropertyByAddress();
 });

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
          <img src={imageURL} alt="What this property looks like." style={{ marginBottom: '10px', marginTop: '10px'}} />
        </div>
      </div>
      <button className="deleteProperty" onClick = {(event) => {
                        return navigate('/RequestVisitPage', {state: {
                          address: address,
                          buyOrRent: "rent"
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

export default RentListing;