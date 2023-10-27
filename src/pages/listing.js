import React from 'react';
import '../styles/Listing.css';
import { BuyList } from '../helpers/BuyList';
import { Link } from 'react-router-dom';

function Listing() {
  const id = 1;
  const { address, price, type, image, lotSize, bathrooms } = BuyList[id];

  const handleRequestVisit = () => {
    
    alert('Property visit requested!');
  };

  return (
    <div className="buyListing">
      <div className="buyItem">
        <h1>Address: {address}</h1>
        <p>Price: {price}</p>
        <p>Type: {type}</p>
        <p>Lot Size: {lotSize}</p>
        <p>Bathrooms: {bathrooms}</p>
        <img src={image} alt="Property Image" style={{ marginBottom: '10px', marginTop: '10px'}} />
        <Link to = '/requestvisitpage'>Request a visit</Link>
      </div>
    </div>
  );
}

export default Listing;

