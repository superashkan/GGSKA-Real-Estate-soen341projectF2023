import React from 'react';
import '../styles/Listing.css';
import { BuyList } from '../helpers/BuyList';
import { Link, useParams } from 'react-router-dom';

function BuyListing() {
  const { id } = useParams();
  const { address, price, type, image, lotSize, bathrooms } = BuyList[id];

  const handleRequestVisit = () => {
    
    alert('Property visit requested!');
  };

  return (
    <div className="listing">
      <h1>Address: {address}</h1>
      <div className="listing-body">
        <div>
          <p>Price: {price}</p>
          <p>Type: {type}</p>
          <p>Lot Size: {lotSize}</p>
          <p>Bathrooms: {bathrooms}</p>
        </div>
        <div>
          <img src={image} alt="Property Image" style={{ marginBottom: '10px', marginTop: '10px'}} />
        </div>
      </div>
      <Link to = '/requestvisitpage' className="visit">Request a visit</Link>
    </div>
  );
}

export default BuyListing;

