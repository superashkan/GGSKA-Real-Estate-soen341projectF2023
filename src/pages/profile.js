import {React, useContext, useState, useEffect} from 'react'
import { BrokerContext } from '../helpers/BrokerContext'
import { Navigate, useNavigate } from 'react-router-dom'
import "../static/css/Profile.css";
import axios from 'axios'
import { neatlyFormatValue } from '../helpers/HelperFunctions';

function Profile() {

  const [propertyList, setPropertyList] = useState([]);

  const navigate = useNavigate();
  const {ready, broker} = useContext(BrokerContext)

  const getBrokerProperties = () => axios.post('/findPropertiesByBroker', {state: {brokerEmail: broker?.email}}).then(result => setPropertyList(result.data))
  .catch((err)=>{
        console.log(err);
      });
  
  useEffect(() => {
    getBrokerProperties();
 });
 
 if(ready && !broker){
  return <Navigate to={'/login'}/>
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
 
  return (

    <div className="profile-container">
      <h1 className="userTitle">Account page for {broker?.name}</h1>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Name:</strong> {broker?.name}</p>
          <p><strong>Email:</strong> {broker?.email}</p>
          <p><strong>Age:</strong> {broker?.age}</p>
          <p><strong>Phone Number:</strong> {broker?.phone_number}</p>
          <p><strong>License Number:</strong> {broker?.license_number}</p>
          <p><strong>Agency:</strong> {broker?.agency}</p>
        </div>
        <br />
        <button className="edit-button" onClick = {(event) => {
                        return navigate('/EditBroker', {state: {
                          currentName: broker?.name,
                          currentEmail: broker?.email,
                          currentAge: broker?.age,
                          currentPhone: broker?.phone_number,
                          currentLicenseNumber: broker?.license_number,
                          currentAgency: broker?.agency
                        }});
                        }
                        }>
                        Edit
                      </button> 
        <br />
        <button className="add-listing-button" onClick = {(event) => {
                        return navigate('/Sell', {state: {
                          brokerEmail: broker?.email 
                        }});
                      }
                    }>
                Add Listing
        </button>
        </div>
        <br />
        <h1 className="userTitle">Listed properties for {broker?.name}</h1>
        <table>
          <tr>
            <th>Address</th>
            <th>Price</th>
            <th>Type</th>
            <th>Lot Size</th>
            <th># of Bedrooms</th>
            <th># of Bathrooms</th>
            <th>Buyable or Rentable?</th>
            <th className="emptyCell"></th>
          </tr>
          {propertyList.map((property) => {
            return (
              <tr>
                <td>{property.address}</td>
                <td>{'$' + neatlyFormatValue(property.goingPrice)}</td>
                <td>{property.propertyType}</td>
                <td>{neatlyFormatValue(property.propertySize) + "sqft."}</td>
                <td>{property.numBedrooms}</td>
                <td>{property.numBathrooms}</td>
                <td>{property.forRentOrPurchase}</td>
                <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => {
                        console.log(property.currentPropertyImageURL);
                        console.log(property.forRentOrPurchase);
                        return navigate('/EditProperty', {state: {
                          currentAddress: property.address,
                          currentPrice: property.goingPrice,
                          currentType: property.propertyType,
                          currentBedrooms: property.numBedrooms,
                          currentBathrooms: property.numBathrooms,
                          currentSize: property.propertySize,
                          currentPropertyImageURL: property.propertyImageURL,
                          currentBuyOrRent: property.forRentOrPurchase
                        }});
                        }
                        }>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className = "deleteProperty" onClick={(event) => {
                        return navigate('/buy_listing', {state: {address: property.address}})
                      }}>
                        View Property
                      </button>
                    </td>
                    <td className="propertyDeleteCell">
                      <button className="deleteProperty" onClick = {(event) => handleDeletion(property.address)}>
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

export default Profile
