import { React, useContext, useState, useEffect } from 'react'
import { AccountContext } from '../helpers/AccountContext'
import { Navigate, useNavigate } from 'react-router-dom'
import "../static/css/Profile.css";
import axios from 'axios'
import { neatlyFormatValue } from '../helpers/HelperFunctions';

function BrokerProfile() {

  const [allProperties, setAllProperties] = useState([]);
  const [brokerProperties, setBrokerProperties] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [outgoingOfferList, setOutgoingOfferList] = useState([]);
  const [visitList, setVisitList] = useState([]);
  const [haveAllPropertiesBeenFound, setHaveAllPropertiesBeenFound] = useState(false);
  const [haveVisitsBeenFound, setHaveVisitsBeenFound] = useState(false);
  const [haveOutgoingOfferBeenFound, setHaveOutgoingOfferBeenFound] = useState(false);
  const [haveOffersBeenFound, setHaveOffersBeenFound] = useState(false);
  const [havePropertiesBeenFound, setHavePropertiesBeenFound] = useState(false);

  const navigate = useNavigate();
  const { ready, account } = useContext(AccountContext)

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setAllProperties(result.data))
    .catch((err) => {
      console.log(err);
    });

  const getBrokerProperties = () => axios.post('/findPropertiesByBroker', { state: { brokerEmail: account?.email } }).then(result => setBrokerProperties(result.data))
    .catch((err) => {
      console.log(err);
    });

  const getVisits = () => axios.post('/findVisitsByEmail', { state: { email: account?.email } }).then(result => setVisitList(result.data))
    .catch((err) => {
      console.log(err);
    });

  const getOffers = () => axios.post('/findOffers').then(result => setOfferList(result.data))
    .catch((err) => {
      console.log(err);
    });

  const getOutgoingOffers = () => axios.post('/findOutgoingOffers', { state: { brokerEmail: account?.email } }).then(result => setOutgoingOfferList(result.data))
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {
    if (allProperties.length === 0 && !haveAllPropertiesBeenFound) {
      getAllProperties();
      setHaveAllPropertiesBeenFound(true);
    }
    if (brokerProperties.length === 0 && !havePropertiesBeenFound) {
      getBrokerProperties();
      setHavePropertiesBeenFound(true);
    }
    if (offerList.length === 0 && !haveOffersBeenFound) {
      getOffers();
      setHaveOffersBeenFound(true);
    }
    if (outgoingOfferList.length === 0 && !haveOutgoingOfferBeenFound) {
      getOutgoingOffers();
      setHaveOutgoingOfferBeenFound(true);
    }
    if (visitList.length === 0 && !haveVisitsBeenFound) {
      getVisits();
      setHaveVisitsBeenFound(true);
    }
  });

  if (ready && !account) {
    return <Navigate to={'/login'} />
  }

  const handleDeletion = async function (address) {
    try {
      console.log(address);
      axios.post('/deleteProperty', { address: address })
      return navigate("/")
    }
    catch (e) {
      alert(e);
    }
  }

  const determineStatus = function(property) {
    if (property.forRentOrPurchase === 'Rentable') {
      return "Available For Rent";
    }
    var hasOfferBeenAccepted = false;
    offerList.forEach((offer) => {
      if (offer.address === property.address && offer.accepted) {
        hasOfferBeenAccepted = true;
      }
    })
    return hasOfferBeenAccepted ? "Purchase Offer Accepted" : "Available for Purchase"
  }

  
  
  const areThereProperties = function() {
    if (brokerProperties.length > 0) {
      return (
        <div>
          <br />
          <h1 className="userTitle">Listed properties for {account?.name}</h1>
      <table>
        <tr>
          <th>Address</th>
          <th>Price</th>
          <th>Type</th>
          <th>Lot Size</th>
          <th># of Bedrooms</th>
          <th># of Bathrooms</th>
          <th>Buyable or Rentable?</th>
          <th>Status</th>
        </tr>
        {brokerProperties.map((property) => {
          return (
            <tr>
              <td>{property.address}</td>
              <td>{'$' + neatlyFormatValue(property.goingPrice)}</td>
              <td>{property.propertyType}</td>
              <td>{neatlyFormatValue(property.propertySize) + "sqft."}</td>
              <td>{property.numBedrooms}</td>
              <td>{property.numBathrooms}</td>
              <td>{property.forRentOrPurchase}</td>
              <td>{determineStatus(property)}</td>
              <td className="propertyDeleteCell">
                <button className="deleteProperty" onClick={(event) => {
                  console.log(property.currentPropertyImageURL);
                  console.log(property.forRentOrPurchase);
                  return navigate('/EditProperty', {
                    state: {
                      currentAddress: property.address,
                      currentPrice: property.goingPrice,
                      currentType: property.propertyType,
                      currentBedrooms: property.numBedrooms,
                      currentBathrooms: property.numBathrooms,
                      currentSize: property.propertySize,
                      currentPropertyImageURL: property.propertyImageURL,
                      currentBuyOrRent: property.forRentOrPurchase
                    }
                  });
                }
                }>
                  Edit
                </button>
              </td>
              <td className="propertyDeleteCell">
                <button className="deleteProperty" onClick={(event) => handleDeletion(property.address)}>
                  Delete Property
                </button>
              </td>
            </tr>
          )
        })}
      </table>
        </div>
      )
    }
  }

  const areThereVisits = function() {
    if (visitList.length > 0) {
      return (
        <div>
          <br />
          <h1 className="userTitle">Scheduled visits for {account?.name}</h1>
      <table>
        <tr>
          <th>Address of Property</th>
          <th>Visit Date</th>
          <th>Visit Time</th>
        </tr>
        {visitList.map((visit) => {
          return (
            <tr>
              <td>{visit.propertyAddress}</td>
              <td>{visit.visitDate}</td>
              <td>{visit.visitTime}</td>
            </tr>
          )
        })}
      </table>
        </div>
      )
    }
  }

  const areThereOutgoingOffers = function() {
    if (outgoingOfferList.length > 0) {
      return (
        <div>
          <br />
          <h1 className="userTitle">Purchase offers made by {account?.name}</h1>
      <table>
        <tr>
          <th>Property Address</th>
          <th>Offer Amount</th>
          <th>Client Information</th>
          <th>Deed of Sale Date</th>
          <th>Premises Occupation Date</th>
          <th>Acceptance Status</th>
        </tr>
        {outgoingOfferList.map((offer) => {
          return (
            <tr>
              <td>{offer.address}</td>
              <td>{offer.offer}</td>
              <td>{offer.clientInfo}</td>
              <td>{offer.deedDate}</td>
              <td>{offer.occupancyDate}</td>
              <td>{offer.accepted? "Accepted" : "Not Accepted"}</td>
            </tr>
          )
        })}
      </table>
        </div>
      )
    }
  }

  return (
    <div className="profile-container">
      <h1 className="userTitle">Account page for {account?.name}</h1>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Name:</strong> {account?.name}</p>
          <p><strong>Email:</strong> {account?.email}</p>
          <p><strong>Age:</strong> {account?.age}</p>
          <p><strong>Phone Number:</strong> {account?.phone_number}</p>
          <p><strong>License Number:</strong> {account?.license_number}</p>
          <p><strong>Agency:</strong> {account?.agency}</p>
        </div>
        <br />
        <button className="edit-button" onClick={(event) => {
          return navigate('/EditBroker', {
            state: {
              currentName: account?.name,
              currentEmail: account?.email,
              currentAge: account?.age,
              currentPhone: account?.phone_number,
              currentLicenseNumber: account?.license_number,
              currentAgency: account?.agency
            }
          });
        }
        }>
          Edit
        </button>
        <br />
        <button className="add-listing-button" onClick={(event) => {
          return navigate('/Sell', {
            state: {
              brokerEmail: account?.email
            }
          });
        }
        }>
          Add Listing
        </button>
      </div>
      <br />
      {areThereProperties()}
      {areThereVisits()}
      {areThereOutgoingOffers()}
    </div>

  )
}

export default BrokerProfile
