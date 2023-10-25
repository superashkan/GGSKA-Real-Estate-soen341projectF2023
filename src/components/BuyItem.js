import React from "react";
import '../styles/BuyList.css'

function BuyItem({ image, address, price, type }) {
  return (
    <div className="buyItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {address} </h1>
      <p> {price} </p>
      <p> {type} </p>
    </div>
  );
}

export default BuyItem;