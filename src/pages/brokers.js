import React, { useContext } from 'react';
import { BrokerContext } from '../helpers/BrokerContext';
import { Navigate } from 'react-router-dom';
import '../styles/Brokers.css';

function Brokers() {
  const { ready, broker } = useContext(BrokerContext);

  // Fake broker data
  const fakeBrokers = [
    {
      id: 1,
      name: 'Broker 1',
      company: 'Company A',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Broker 2',
      company: 'Company B',
      rating: 3.8,
    },
    {
      id: 3,
      name: 'Broker 3',
      company: 'Company C',
      rating: 4.2,
    },
  ];

  return (
    <div className="brokers-container">
        <div className="search-container">
        <input type="text" placeholder="Search Brokers"/>
        <button>Search</button>
        </div>
      {fakeBrokers.map((fakeBroker) => (
        <div className="broker-card" key={fakeBroker.id}>
          <h2>{fakeBroker.name}</h2>
          <p>Company: {fakeBroker.company}</p>
          <p>Rating: {fakeBroker.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default Brokers;
