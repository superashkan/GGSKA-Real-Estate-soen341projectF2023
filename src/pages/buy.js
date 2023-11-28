import {React, useState, useEffect} from "react";
import BuyItem from "../components/page_specific/BuyItem";
import "../static/css/BuyList.css";
import axios from 'axios';
import { neatlyFormatValue } from "../helpers/HelperFunctions";

function Buy() {

  let [propertyList, setPropertyList] = useState([]);

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setPropertyList(result.data))
  .catch((err)=>{
    console.log(err);
  });
  
  useEffect(() => {
    if (propertyList.length === 0) {
      getAllProperties();
    }
  });

  return (
    <div className="menu">
      <h1 className="buyTitle" font>Properties for Purchase</h1>
      <div className="buyList">
        {propertyList.map((buyItem, key) => {
          if (buyItem.forRentOrPurchase === "Buyable" && buyItem.displayed === true) {
          return (
            <BuyItem
              key={key}
              uid={key}
              image={buyItem.propertyImageURL}
              address={buyItem.address}
              price={'$' + neatlyFormatValue(buyItem.goingPrice)}
              type={buyItem.propertyType}
              bedrooms={buyItem.numBedrooms + " Bedroom(s)"}
              bathrooms={buyItem.numBathrooms + " Bathroom(s)"}
              size={neatlyFormatValue(buyItem.propertySize) + " sqft."}
            />
          );
          }
        })}
      </div>
    </div>
  );
}

export default Buy;
