import React from "react";
import { RentList } from "../helpers/RentList";
import RentItem from "../components/RentItem";
import "../styles/BuyList.css";

function rent() {
  return (
    <div className="menu">
      <h1 className="buyTitle">Properties Available to Rent</h1>
      <div className="buyList">
        {RentList.map((rentItem, key) => {
          return (
            <RentItem
              key={key}
              uid={key}
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