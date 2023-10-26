import React from 'react';
import '../styles/Listing.css';
import { BuyList } from '../helpers/BuyList';

function Listing() {
  const id = 1;
  const { address, price, type, image, lotSize, bathrooms } = BuyList[id];

  const handleRequestVisit = () => {
    // Add logic for handling the property visit request here
    alert('Property visit requested!'); // Replace this with your actual logic
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
        <button
          onClick={handleRequestVisit}
          style={{ fontFamily: 'Arial', fontSize: '18px' }}
        >
          Request Property Visit
        </button>
      </div>
    </div>
  );
}

export default Listing;
