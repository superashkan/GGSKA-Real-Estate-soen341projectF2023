import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Brokers.css';
import axios from 'axios'

function Brokers() {
  const [brokers, setBrokers] = useState([])

  const getAllBrokers = () => axios.get('http://localhost:3001/getBrokers').then(brokers => setBrokers(brokers.data));
  
  useEffect(() => {
    getAllBrokers();
  }, [])

  return (
    <div className="brokers-container">
        <div className="search-container">
        <input type="text" placeholder="Search Brokers"/>
        <button>Search</button>
        </div>
        
      {
      brokers.map(broker => (
        
        <div className="broker-card">
          <h2>{broker.name}</h2>
          <p>Email: {broker.email}</p>
          <p>Rating: {broker.age}</p>
        </div>
      ))
      }
    </div>
    
  );
}

export default Brokers;
