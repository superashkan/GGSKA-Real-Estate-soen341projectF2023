import React from "react";
import { RentList } from "../helpers/RentList";
import RentItem from "../components/RentItem";
import "../styles/BuyList.css";

function rent() {
  return (
    <div className="menu">
      <h1 className="buyTitle">Whats for rent</h1>
      <div className="buyList">
        {RentList.map((rentItem, key) => {
          return (
            <RentItem
              key={key}
              image={rentItem.image}
              address={rentItem.address}
              price={rentItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default rent;