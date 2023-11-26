import {React, useState, useEffect} from "react";
import BuyItem from "../components/page_specific/BuyItem";
import RentItem from "../components/page_specific/RentItem";
import "../static/css/BuyList.css";
import axios from 'axios';
import {useLocation} from "react-router-dom";

function Buy() {

  const location = useLocation();
  const brokerEmail = location.state.brokerEmail;
  const brokerName = location.state.brokerName;
  var [propertyList, setPropertyList] = useState([]);

  const getBrokerProperties = () => axios.post('/findPropertiesByBroker', {state: {brokerEmail: brokerEmail}}).then(result => setPropertyList(result.data))
  .catch((err)=>{
        console.log(err);
      });
  
  useEffect(() => {
    getBrokerProperties();
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
      <h1 className="buyTitle" font>Properties Listed by {brokerName}</h1>
      <div className="buyList">
        {propertyList.map((buyItem, key) => {
          if (buyItem.forRentOrPurchase == "Buyable") {
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
          if (buyItem.forRentOrPurchase == "Rentable") {
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

export default Buy;
