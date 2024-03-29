import {React} from "react";
import '../../static/css/BuyList.css'
import {useNavigate} from "react-router-dom";

function RentItem({ image, address, price, type, bedrooms, bathrooms, size }) {
  const navigate = useNavigate();
  return (
    <div className="buyItem" onClick={() => {
      return navigate('/RentListing', {state: {address: address}});
    }}>
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <h1> {address} </h1>
        <p> {price} </p>
        <p> {type} </p>
        <p> {bedrooms} </p>
        <p> {bathrooms} </p>
        <p> {size} </p>
    </div>
  );
}

export default RentItem;
