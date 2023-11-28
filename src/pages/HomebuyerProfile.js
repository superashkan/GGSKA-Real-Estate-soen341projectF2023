import { React, useContext, useState, useEffect } from 'react'
import { AccountContext } from '../helpers/AccountContext'
import { Navigate, useNavigate } from 'react-router-dom'
import "../static/css/Profile.css";
import axios from 'axios'

function HomebuyerProfile() {

  const [allProperties, setAllProperties] = useState([]);
  const [visitList, setVisitList] = useState([]);
  const [haveAllPropertiesBeenFound, setHaveAllPropertiesBeenFound] = useState(false);
  const [haveVisitsBeenFound, setHaveVisitsBeenFound] = useState(false);

  const navigate = useNavigate();
  const { ready, account } = useContext(AccountContext)

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setAllProperties(result.data))
    .catch((err) => {
      console.log(err);
    });

  const getVisits = () => axios.post('/findVisitsByEmail', { state: { email: account?.email } }).then(result => setVisitList(result.data))
    .catch((err) => {
      console.log(err);
    });

  useEffect(() => {
    if (allProperties.length === 0 && !haveAllPropertiesBeenFound) {
      getAllProperties();
      setHaveAllPropertiesBeenFound(true);
    }
    if (visitList.length === 0 && !haveVisitsBeenFound) {
      getVisits();
      setHaveVisitsBeenFound(true);
    }
  });

  if (ready && !account) {
    return <Navigate to={'/login'} />
  }

  const getPropertyByAddress = function(address) {
    let property = allProperties.filter((property) => property.address === address)[0]
    return property;
  }

  const viewProperty = function(property) {
    if (property.forRentOrPurchase === "Buyable") {
      return (
        <div>
          <button className="deleteProperty" onClick={(event) => {
                  return navigate('/buy_listing', { state: { address: property.address } })
                }}>
            View Property
          </button>
        </div>
      )
    }
    if (property.forRentOrPurchase === "Rentable") {
      return (
        <div>
          <button className="deleteProperty" onClick={(event) => {
                  return navigate('/rent_listing', { state: { address: property.address } })
                }}>
            View Property
          </button>
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
              <td>{viewProperty(getPropertyByAddress(visit.propertyAddress))}</td>
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
        </div>
        <br />
        <button className="edit-button" onClick={(event) => {
          return navigate('/EditBroker', {
            state: {
              currentName: account?.name,
              currentEmail: account?.email,
              currentAge: account?.age,
              currentPhone: account?.phone_number,
            }
          });
        }
        }>
          Edit
        </button>
        <br />
      </div>
      <br />
      {areThereVisits()}
    </div>

  )
}

export default HomebuyerProfile
