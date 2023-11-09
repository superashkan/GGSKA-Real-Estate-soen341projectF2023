import {React, useState, useContext, useEffect } from 'react'
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function BrokerEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentEmail = location.state.currentEmail;
  const currentPhone = location.state.currentPhone;
  const currentName = location.state.currentName;
  const currentAge = location.state.currentAge;
  const currentAgency = location.state.currentAgency;
  const currentLicenseNumber = location.state.currentLicenseNumber;
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form">
        <label htmlFor="name">Full Name</label>
        <input name="name" value={currentName} type="text" />

        <label htmlFor="email">Email</label>
        <input name="email"  value={currentEmail} type="email" />

        <label htmlFor="newAge">Age</label>
        <input name="newAge"  value={currentAge} type="number" />

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" value={currentPhone} type="string" />

        <label htmlFor="licenseNumber">License Number</label>
        <input name="licenseNumber" defaultValue={currentLicenseNumber} type="number"/>

        <label htmlFor="agency">Name of Agency</label>
        <input name="agency"  defaultValue={currentAgency} type="string" />
        <button className="propertySearchButton" onClick = {(event) => {
                        return navigate('/BrokerProperties', {state: {
                          brokerEmail: currentEmail,
                          brokerName: currentName
                        }});
                      }
                    }>
                View Listings
        </button>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default BrokerEditForm
