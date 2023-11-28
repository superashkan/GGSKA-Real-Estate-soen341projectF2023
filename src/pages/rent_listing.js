import { React, useState, useEffect, useContext } from 'react';
import '../static/css/Listing.css';
import "../static/css/MultiPageCSS.css";
import { AccountContext } from '../helpers/AccountContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isNullOrEmpty, neatlyFormatValue } from '../helpers/HelperFunctions';

function RentListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyAddress = location.state.address;
  const { ready, account } = useContext(AccountContext);
  let [address, setAddress] = useState("");
  let [price, setPrice] = useState("");
  let [type, setType] = useState("");
  let [size, setSize] = useState("");
  let [bathrooms, setBathrooms] = useState("");
  let [bedrooms, setBedrooms] = useState("");
  let [imageURL, setImageURL] = useState("");
  let [visitList, setVisitList] = useState([]);
  let [haveVisitsBeenFound, setHaveVisitsBeenFound] = useState(false);

  const findVisitsByAddress = () => {
    axios.post('/findVisitsByAddress', { propertyAddress: propertyAddress }).then(result => {
      setVisitList(result.data);
    });
  }

  const findPropertyByAddress = () => {
    axios.post('/findPropertyByAddress', { propertyAddress: propertyAddress }).then(result => {
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
    if (isNullOrEmpty(address)) {
      findPropertyByAddress();
    }
    if (visitList.length === 0 && !haveVisitsBeenFound) {
      findVisitsByAddress();
      setHaveVisitsBeenFound(true);
    }
  });

  const requestVisit = function () {
    if (account) {
      return (
        <div>
          <button className="deleteProperty" onClick={(event) => {
            return navigate('/RequestVisitPage', {
              state: {
                address: address,
                buyOrRent: "rent",
                email: account.email
              }
            });
          }
          }>
            Request a Visit
          </button>
          <br />
        </div>
      )
    }
  }

  const getVisits = function () {
    if (visitList.length > 0) {
      return (
        <div>
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
              )
            })
            }
          </table>
        </div>
      )
    }
  }

  if (account) {
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
            <img src={imageURL} alt="What this property looks like." style={{ marginBottom: '10px', marginTop: '10px' }} />
          </div>
        </div>
        {requestVisit()}
        {getVisits()}
      </div>
    );
  } else {
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
            <img src={imageURL} alt="Property Image" style={{ marginBottom: '10px', marginTop: '10px' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default RentListing;