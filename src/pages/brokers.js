import {React, useContext, useState, useEffect } from 'react';
import { BrokerContext } from '../helpers/BrokerContext';
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import '../styles/Brokers.css';
import axios from 'axios'

function Brokers() {
  const navigate = useNavigate();
  const { ready, broker } = useContext(BrokerContext);
  var [brokerList, setBrokerList] = useState([]);
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [searchResults, setSearchResults] = useState([]);
  var [hasSearchOccurred, setHasSearchOccurred] = useState(false);

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const performChecks = function() {
    if (isNullOrEmpty(firstName)) {
      if (isNullOrEmpty(lastName)) {
        alert("Please enter a first or last name");
        setSearchResults([]);
        return false;
      }
    }
    return true;
  }

  const getAllBrokers = () => {
    axios.get('/getAllBrokers').then(result => {
      setBrokerList(result.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  
  useEffect(() => {
    getAllBrokers();
  }, []);

  const handleBrokerSearch = async function(event) {
    event.preventDefault();
    setHasSearchOccurred(true);
    if (performChecks() == true) {
    try {
      axios.post('/searchBrokers', {firstName, lastName}).then((response) => {
        setSearchResults(response.data);
        console.log(response);
      });
    }
  catch(error) {
    alert(error)
    alert("Broker search failed.");
  }
}
}

const constructHTML = function() {
  if (hasSearchOccurred == false) {
    return (
      <div className="brokers-container">
        <h1>Search for Brokers</h1>
        <div className="search-container">
          <form onSubmit={handleBrokerSearch}>
            <input type="text" placeholder="First Name" onInput={(event) => setFirstName(event.target.value)}/>
            <input type="text" placeholder="Last Name" onInput={(event) => setLastName(event.target.value)}/>
            <button type="submit">Search</button>
          </form>
        </div>
        {brokerList.map((broker) => {
        return (
        <div className="broker-card" key={broker.id} onClick = {(event) => {
          return navigate('/BrokerInfo', {state: {
            currentName: broker.name,
            currentAge: broker.age,
            currentEmail: broker.email,
            currentAgency: broker.agency,
            currentPhone: broker.phone_number,
            currentLicenseNumber: broker.license_number
          }});
          }
          }>
          <h2>{broker.name}</h2>
          <p>Email Address: {broker.email}</p>
          <p>Age: {broker.age}</p>
          <p>Phone Number: {broker.phone_number}</p>
          <p>License Number: {broker.license_number}</p>
          <p>Agency: {broker.agency}</p>
        </div>
        );
      })}
      </div>
    )
  }
  else if (searchResults.length == 0) {
    return (
      <div className="brokers-container">
        <h1>Search for Brokers</h1>
        <div className="search-container">
          <form onSubmit={handleBrokerSearch}>
            <input type="text" placeholder="First Name" onInput={(event) => setFirstName(event.target.value)}/>
            <input type="text" placeholder="Last Name" onInput={(event) => setLastName(event.target.value)}/>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    )
  }
    else {
      return (
        <div className="brokers-container">
          <h1>Search for Brokers</h1>
          <div className="search-container">
            <form onSubmit={handleBrokerSearch}>
              <input type="text" placeholder="First Name" onInput={(event) => setFirstName(event.target.value)}/>
              <input type="text" placeholder="Last Name" onInput={(event) => setLastName(event.target.value)}/>
              <button type="submit">Search</button>
          </form>
          </div>
      {searchResults.map((broker) => {
        return (
        <div className="broker-card" key={broker.id} onClick = {(event) => {
          return navigate('/BrokerInfo', {state: {
            currentName: broker.name,
            currentAge: broker.age,
            currentEmail: broker.email,
            currentAgency: broker.agency,
            currentPhone: broker.phone_number,
            currentLicenseNumber: broker.license_number
          }});
          }
          }>
          <h2>{broker.name}</h2>
          <p>Email Address: {broker.email}</p>
          <p>Age: {broker.age}</p>
          <p>License Number: {broker.license_number}</p>
          <p>Agency: {broker.agency}</p>
        </div>
        );
      })}
      </div>
      )
    }
  }
  return constructHTML();
}

export default Brokers;
