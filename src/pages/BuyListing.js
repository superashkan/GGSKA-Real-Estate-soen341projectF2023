import { React, useContext, useState, useEffect } from 'react';
import '../static/css/Listing.css';
import "../static/css/MultiPageCSS.css";
import { BrokerContext } from '../helpers/BrokerContext'
import { AccountContext } from '../helpers/AccountContext'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { neatlyFormatValue, isNullOrEmpty } from '../helpers/HelperFunctions';

function BuyListing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useContext(AccountContext);
  const propertyAddress = location.state.address;
  let [address, setAddress] = useState("");
  let [price, setPrice] = useState("");
  let [type, setType] = useState("");
  let [size, setSize] = useState("");
  let [bathrooms, setBathrooms] = useState("");
  let [bedrooms, setBedrooms] = useState("");
  let [imageURL, setImageURL] = useState("");
  let [propertyBrokerEmail, setPropertyBrokerEmail] = useState("");
  let [visitList, setVisitList] = useState([]);
  let [offerList, setOfferList] = useState([]);
  let [offerButtonDisabled, setOfferButtonDisabled] = useState(true);
  let [haveOffersBeenFound, setHaveOffersBeenFound] = useState(false);
  let [haveVisitsBeenFound, setHaveVisitsBeenFound] = useState(false);

  const findPropertyByAddress = () => {
    axios.post('/findPropertyByAddress', { propertyAddress: propertyAddress }).then(result => {
      setAddress(result.data.address);
      setPrice(result.data.goingPrice);
      setType(result.data.propertyType);
      setBathrooms(result.data.numBathrooms);
      setBedrooms(result.data.numBedrooms);
      setSize(result.data.propertySize);
      setImageURL(result.data.propertyImageURL);
      setPropertyBrokerEmail(result.data.brokerEmail);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  const findOffersByAddress = () => {
    axios.post('/findOffersByAddress', { currentAddress: [propertyAddress] }).then(result => {
      setOfferList(result.data);
    });
  }

  const findVisitsByAddress = () => {
    axios.post('/findVisitsByAddress', { propertyAddress: propertyAddress }).then(result => {
      setVisitList(result.data);
    })
      .catch((err) => {
        console.log(err);
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
    if (offerList.length === 0 && !haveOffersBeenFound) {
      findOffersByAddress();
      setHaveOffersBeenFound(true);
    }
    if (account && account.accountType === "Broker") {
      setOfferButtonDisabled(false);
    }
  });

  const requestVisit = function() {
    if (account) {
      return (
        <div>
          <button className="deleteProperty" onClick={(event) => {
            return navigate('/RequestVisitPage', {
              state: {
                address: address,
                buyOrRent: "buy",
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

  const offerButton = function () {
    return (
      <div>
        <button className="deleteProperty" disabled={offerButtonDisabled} onClick={(event) => {
          return navigate('/Offer', {
            state: {
              currentAddress: address
            }
          });
        }
        }>
          Make Offer
        </button>
        <br />
      </div>
    );
  }

  const calculateMortgage = function () {
    if (account && account.accountType === "Homebuyer") {
      return (
        <div>
          <button className="deleteProperty" onClick={(event) => {
            return navigate('/MortgageCalculator', {
              state: {
                homePrice: price
              }
            });
          }
          }>
            Calculate Mortgage
          </button>
          <br />
        </div>
      )
    }
  }

  const acceptOrReject = function (accepted, offerID) {
    if (account?.email === propertyBrokerEmail) {
      return (
        <div>
          <tr>
            <button className="deleteProperty" disabled={accepted} onClick={(event) => {
              axios.post('/acceptOffer', {
                address: address,
                offerID: offerID
              });
              alert("Accepted!");
              return navigate('/BrokerProfile');
            }
            }>
              Accept
            </button>
            <button className="deleteProperty" disabled={!accepted} onClick={(event) => {
              axios.post('/rejectOffer', {
                address: address,
                offerID: offerID
              });
              alert("Rejected!");
              return navigate('/BrokerProfile');
            }
            }>
              Reject
            </button>
          </tr>
        </div>
      );
    }
  }

  const showOffers = function() {
    if (offerList.length > 0) {
      return (
        <div>
          <br />
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
              )
            })
            }
          </table>
        </div>
      )
    }
  }

  const showVisits = function() {
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

  const constructHTML = function () {
    if (account && (account.accountType === "Broker" && account.email !== propertyBrokerEmail)) {
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
          {requestVisit()}
          {offerButton()}
          {showVisits()}
          {showOffers()}
        </div>
      );
    }
    if (account && (account.accountType === "Broker" && account.email === propertyBrokerEmail)) {
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
          {showVisits()}
          {showOffers()}
        </div>
      );
    } 
    if (account && account.accountType === "Homebuyer") {
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
          {requestVisit()}
          {calculateMortgage()}
          {showVisits()}
          {showOffers()}
        </div>
      );
    }
    if (!account) {
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
  return constructHTML();
}

export default BuyListing;