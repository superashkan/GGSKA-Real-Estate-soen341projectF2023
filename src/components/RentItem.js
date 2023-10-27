import React from "react";
import '../styles/BuyList.css'
import { Link } from "react-router-dom";

function RentItem({ image, address, price, type, uid }) {
  const listingURL = `/rent-listing/${uid}`;
  return (
    <div className="buyItem">
      <Link to={listingURL}>
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <h1> {address} </h1>
        <p> {price} </p>
        <p> {type} </p>
      </Link>
    </div>
  );
}

export default RentItem;