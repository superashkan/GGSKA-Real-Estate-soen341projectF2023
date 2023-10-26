import React from "react";
import '../styles/BuyList.css'

function neatlyFormatValue(value) {
  var newValueStr = "";
  var forwardPositionCounter = 0;
  for (var i = value.toString().length - 1;i >= 0;i--) {
    if ((forwardPositionCounter % 3 == 0 && forwardPositionCounter > 0)) {
      newValueStr = "," + newValueStr;
    }
    newValueStr = value.toString()[i] + newValueStr;
    forwardPositionCounter++;
  }
  return newValueStr;
}

function BuyItem({ image, address, price, type, lotSize }) {
  return (
    <div className="buyItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {address} </h1>
      <p> ${neatlyFormatValue(price)} </p>
      <p> {type} </p>
      <p> {neatlyFormatValue(lotSize)} sqft. </p>
    </div>
  );
}

export default BuyItem;
