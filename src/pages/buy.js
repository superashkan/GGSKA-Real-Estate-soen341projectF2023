import {React, useState, useEffect} from "react";
import { BuyList } from "../helpers/BuyList";
import BuyItem from "../components/BuyItem";
import "../styles/BuyList.css";
import axios from 'axios';

function Buy() {

  var [propertyList, setPropertyList] = useState([]);

  const getAllProperties = () => axios.get('/getAllProperties').then(result => setPropertyList(result.data));
  
  useEffect(() => {
    getAllProperties();
  }, []);

  const neatlyFormatValue = function(value) {
    value = value.toString();
    var newValueStr = "";
    var forwardPositionCounter = 0;
    for (var i = value.length - 1;i >= 0;i--) {
      if (!value.toString().includes(".")) {
        if (forwardPositionCounter % 3 == 0 && forwardPositionCounter > 0) {
          newValueStr = "," + newValueStr;
        }
      } else {
        if (forwardPositionCounter % 3 && forwardPositionCounter > 0) {
          if ((newValueStr[i] != "," && newValueStr[i + 1] != ",") && (newValueStr[i + 2] != "," && newValueStr[i + 3] != ",")) {
            if ((value.toString()[i] != "." && value.toString()[i + 1] != ".") && (value.toString()[i + 2] != "." && value.toString()[i + 3] != ".")) {
              newValueStr = "," + newValueStr;
            }
          }
        }
        if (newValueStr.length > 6) {

        }
      }
      newValueStr = value.toString()[i] + newValueStr;
      forwardPositionCounter++;
    }
    return newValueStr;
  }

  return (
    <div className="menu">
      <h1 className="buyTitle" font>Properties for Purchase</h1>
      <div className="buyList">
        {propertyList.map((buyItem, key) => {
          return (
            <BuyItem
              key={key}
              uid={key}
              image={buyItem.propertyImageURL}
              address={buyItem.address}
              price={'$' + neatlyFormatValue(buyItem.goingPrice)}
              type={buyItem.propertyType}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Buy;
