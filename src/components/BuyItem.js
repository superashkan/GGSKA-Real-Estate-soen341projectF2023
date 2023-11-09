import {React, useState, useEffect} from "react";
import '../styles/BuyList.css'
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function BuyItem({ image, address, price, type, uid }) {
  const navigate = useNavigate();
  return (
    <div className="buyItem" onClick={() => {
      return navigate('/buy_listing', {state: {address: address}});
    }}>
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <h1> {address} </h1>
        <p> {price} </p>
        <p> {type} </p>
    </div>
  );
}

export default BuyItem;
