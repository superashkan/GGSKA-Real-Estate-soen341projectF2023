import {React, useState, useEffect} from "react";
import RentItem from "../components/page_specific/RentItem";
import "../static/css/BuyList.css";
import axios from 'axios';
import { neatlyFormatValue } from "../helpers/HelperFunctions";

function Rent() {
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
      <h1 className="buyTitle" font>Properties for Rent</h1>
      <div className="buyList">
        {propertyList.map((buyItem, key) => {
          if (buyItem.forRentOrPurchase === "Rentable") {
          return (
            <RentItem
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

export default Rent;