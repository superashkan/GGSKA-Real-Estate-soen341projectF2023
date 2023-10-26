import React from 'react'
import '../styles/Listing.css'
import { BuyList } from '../helpers/BuyList';

function listing() {
    const id = 1;
    const { address, price, type, image, lotSize, bathrooms } = BuyList[id];
  return (
        <div className='menu'>
            <div className="buyItem">
                <h1> {address} </h1>
                <p> {price} </p>
                <p> {type} </p>
                <p> {lotSize} </p>
                <p> {bathrooms} </p>
                <img src={image}></img>
            </div>
        </div>
    );
}
    
export default listing;
