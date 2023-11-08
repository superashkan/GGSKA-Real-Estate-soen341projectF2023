import React, {useContext} from 'react'
import { BrokerContext } from '../helpers/BrokerContext'
import { Navigate } from 'react-router-dom'
import "../styles/Profile.css";

function Profile() {
  const {ready, broker} = useContext(BrokerContext)
 
 if(ready && !broker){
  return <Navigate to={'/login'}/>
 }
 
  return (

    <div className="profile-container">
      <h1 className="userTitle">Account page for {broker?.name}</h1>
      <div className="profile-details">
        <div className="profile-info">
          <p><strong>Name:</strong> {broker?.name}</p>
          <p><strong>Email:</strong> {broker?.email}</p>
          <p><strong>Age:</strong> {broker?.age}</p>
        </div>
        <button className="edit-button">Edit</button>
        </div>
        <div>
        <button className="add-listing-button">Add Listing</button>
        </div>
    </div>

  )
}

export default Profile
