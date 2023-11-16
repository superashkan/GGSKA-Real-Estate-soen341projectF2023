import {React, useContext, useState, useEffect} from 'react';
import '../styles/Listing.css';
import "../styles/MultiPageCSS.css";
import { BrokerContext } from '../helpers/BrokerContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BuyListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const {broker} = useContext(BrokerContext);
  const propertyAddress = location.state.address;
  var [address, setAddress] = useState("");
  var [price, setPrice] = useState("");
  var [type, setType] = useState("");
  var [size, setSize] = useState("");
  var [bathrooms, setBathrooms] = useState("");
  var [bedrooms, setBedrooms] = useState("");
  var [imageURL, setImageURL] = useState("");
  var [propertyBrokerEmail, setPropertyBrokerEmail] = useState("");
  var [visitList, setVisitList] = useState([]);
  var [offerList, setOfferList] = useState([]);
  var [offerButtonDisabled, setOfferButtonDisabled] = useState(true);
  var [property, setProperty] = useState();

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

  const findPropertyByAddress = () => {
    axios.post('/findPropertyByAddress', {propertyAddress: propertyAddress}).then(result => {
      setAddress(result.data.address);
      setPrice(result.data.goingPrice);
      setType(result.data.propertyType);
      setBathrooms(result.data.numBathrooms);
      setBedrooms(result.data.numBedrooms);
      setSize(result.data.propertySize);
      setImageURL(result.data.propertyImageURL);
      setPropertyBrokerEmail(result.data.brokerEmail);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const findOffersByAddress = () => {
    axios.post('/findOffersByAddress', {currentAddress: [propertyAddress]}).then(result => {
      setOfferList(result.data);
    });
  }

  const findVisitsByAddress = () => {
    axios.post('/findVisitsByAddress', {propertyAddress: propertyAddress}).then(result => {
      setVisitList(result.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  
  useEffect(() => {
    findPropertyByAddress();
    findVisitsByAddress();
    findOffersByAddress();
    if (broker) {
      setOfferButtonDisabled(false);
    }
 }, []);

 const offerButton = function() {
  return (
    <div>
    <button className="deleteProperty" disabled={offerButtonDisabled} onClick = {(event) => {
      return navigate('/Offer', {state: {
        currentAddress: address
      }});
      }
      }>
      Make Offer
    </button>
    <br />
    </div>
  );
 }

 const acceptOrReject = function(accepted, offerID) {
  if (broker?.email == propertyBrokerEmail) {
    return (
      <div>
        <tr>
          <button className="deleteProperty" disabled={accepted} onClick = {(event) => {
          axios.post('/acceptOffer', {
            address: address,
            offerID: offerID
          });
          alert("Accepted!");
          return navigate('/buy_listing', {state: {
            address: address
          }});
          }
          }>
          Accept
        </button>
        <button className="deleteProperty" disabled={!accepted} onClick = {(event) => {
          axios.post('/rejectOffer', {
            address: address,
            offerID: offerID
          });
          alert("Rejected!");
          return navigate('/buy_listing', {state: {
            address: address
          }});
          }
          }>
          Reject
        </button>
      </tr>
      </div>
    );
  }
 }

 const constructHTML = function() {
    if (broker && broker.email == propertyBrokerEmail) {
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
                              address: address,
                              buyOrRent: "buy"
                            }});
                            }
                            }>
                            Request a Visit
                          </button>
          <br />
          {offerButton()}
          <button className="deleteProperty" onClick = {(event) => {
                            return navigate('/MortgageCalculator', {state: {
                              homePrice: price
                            }});
                            }
                            }>
                            Calculate Mortgage
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
          <br/>
          <h1>Purchase Offers</h1>
          <table>
            <tr>
                <th>Offer</th>
                <th>Broker Name</th>
                <th>Deed of Sale Date</th>
                <th>Premises Occupancy Date</th>
            </tr>
            {offerList.map((offer) => {
            return (
              <tr>
                <td>${neatlyFormatValue(offer.offer)}</td>
                <td>{offer.brokerName}</td>
                <td>{offer.deedDate}</td>
                <td>{offer.occupancyDate}</td>
                {acceptOrReject(offer.accepted, offer.offerID)}
              </tr>
            )})
            }
          </table>
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
              <img src={imageURL} alt="Property Image" style={{ marginBottom: '10px', marginTop: '10px'}} />
            </div>
          </div>
          <button className="deleteProperty" onClick = {(event) => {
                            return navigate('/RequestVisitPage', {state: {
                              address: address,
                              buyOrRent: "buy"
                            }});
                            }
                            }>
                            Request a Visit
                          </button>
          <br />
          <button className="deleteProperty" onClick = {(event) => {
                            return navigate('/MortgageCalculator', {state: {
                              homePrice: price
                            }});
                            }
                            }>
                            Calculate Mortgage
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
          <br/>
          <h1>Purchase Offers</h1>
          <table>
            <tr>
                <th>Offer</th>
                <th>Broker Name</th>
                <th>Deed of Sale Date</th>
                <th>Premises Occupancy Date</th>
            </tr>
            {offerList.map((offer) => {
            return (
              <tr>
                <td>${neatlyFormatValue(offer.offer)}</td>
                <td>{offer.brokerName}</td>
                <td>{offer.deedDate}</td>
                <td>{offer.occupancyDate}</td>
              </tr>
            )})
            }
          </table>
        </div>
      );
    }
 }
  return constructHTML();
}

export default BuyListing;