import React from "react";
import { BuyList } from "../helpers/BuyList";
import BuyItem from "../components/BuyItem";
import "../styles/BuyList.css";

function buy() {
  return (
    <div className="menu">
      <h1 className="buyTitle">Whats for sale</h1>
      <div className="buyList">
        {BuyList.map((buyItem, key) => {
          return (
            <BuyItem
              key={key}
              uid={key}
              image={buyItem.image}
              address={buyItem.address}
              price={buyItem.price}
              type={buyItem.type}
            />
          );
        })}
      </div>
    </div>
  );
}

export default buy;
