import {React, useState, useContext, useEffect } from 'react'
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function BrokerEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentEmail = location.state ? location.state.currentEmail : null;
  const currentPhone = location.state ? location.state.currentPhone : null;
  const currentName = location.state ? location.state.currentName : null;
  const currentAge = location.state ? location.state.currentAge : null;
  const currentAgency = location.state ? location.state.currentAgency : null;
  const currentLicenseNumber = location.state ? location.state.currentLicenseNumber : null;
  var [newEmail, setNewEmail] = useState("");
  var [newPhone, setNewPhone] = useState("");
  var [newName, setNewName] = useState("");
  var [newAge, setNewAge] = useState("");
  var [newAgency, setNewAgency] = useState("");
  var [newLicenseNumber, setNewLicenseNumber] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input values in all fields.");

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const handleEdit = async function(event) {
    try{
        if (isNullOrEmpty(newEmail)) {
            newEmail = currentEmail;
        }
        if (isNullOrEmpty(newPhone)) {
            newPhone = currentPhone;
        }
        if (isNullOrEmpty(newName)) {
            newName = currentName;
        }
        if (isNullOrEmpty(newAge)) {
            newAge = currentAge;
        }
        if (isNullOrEmpty(newLicenseNumber)) {
            newLicenseNumber = currentLicenseNumber;
        }
        if (isNullOrEmpty(newAgency)) {
            newAgency = currentAgency;
        }
      axios.post('/editBroker', {currentEmail, newEmail, newPhone, newName, newAge, newLicenseNumber, newAgency})
      .catch((err)=>{
        console.log(err);
      });
      alert('Broker edit successful');
      return navigate('/profile');
    }
    catch (e){
      alert(e);
    }
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form" onSubmit={handleEdit}>
        <label htmlFor="newName">Full Name</label>
        <input name="newName" placeholder="Enter full name..." defaultValue={currentName} type="text" onChange={(e) => setNewName(e.target.value)}/>

        <label htmlFor="newEmail">Email</label>
        <input name="newEmail" placeholder="Enter email..."  defaultValue={currentEmail} type="email" onChange={(e) => setNewEmail(e.target.value)}/>

        <label htmlFor="newAge">Age</label>
        <input name="newAge" placeholder="Enter age..."  defaultValue={currentAge} type="number" onChange={(e) => setNewAge(e.target.value)}/>

        <label htmlFor="newPhone">Phone Number</label>
        <input name="newPhone" placeholder="Enter phone number..."  defaultValue={currentPhone} type="string" onChange={(e) => setNewPhone(e.target.value)}/>

        <label htmlFor="newLicenseNumber">License Number</label>
        <input name="newLicenseNumber" placeholder="Enter license number..."  defaultValue={currentLicenseNumber} type="number" onChange={(e) => setNewLicenseNumber(e.target.value)}/>

        <label htmlFor="newAgency">Name of Agency</label>
        <input name="newAgency" placeholder="Enter the name of your agency..."  defaultValue={currentAgency} type="string" onChange={(e) => setNewAgency(e.target.value)}/>
        <button className="button" type="submit"> Edit Broker Profile </button>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default BrokerEditForm
