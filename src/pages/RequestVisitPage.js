import {React, useState, useContext } from 'react';
import '../static/css/RequestVisitPage.css';
import "../static/css/MultiPageCSS.css";
import { AccountContext } from '../helpers/AccountContext';
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function RequestVisitPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state ? location.state.address : null;
  const email = location.state ? location.state.email : null;
  const buyOrRent = location.state ? location.state.buyOrRent : 'buy';
  const { ready, account } = useContext(AccountContext);
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");

  const handleVisitScheduling = async function(event) {
    try{
      let visitorName = account.name;
      axios.post('/createVisit', {address, visitorName, email, date, time});
      alert('Visit scheduling successful')
      if (buyOrRent === 'buy') {
        return navigate('/BuyListing', {state: {
          address: address
        }});
      }
      if (buyOrRent === 'rent') {
        return navigate('/RentListing', {state: {
          address: address
        }});
      }
      return navigate('/');
    }
    catch (e){
      alert(e);
    }
  }

    return (
        <div className="visitForm">

          <h1> Request a property visit to </h1>
          <br />
          <h1>{address}</h1>

          <div>
          <form id="search-form" onSubmit={handleVisitScheduling}>
            <label htmlFor="name">Full Name</label>
            <input name="name" placeholder="Enter full name..." type="text" readOnly={true} value={account.name}/>
            <label htmlFor="Time">24 Hour Time</label>
            <input time="time" type="time" required="true" onInput={(event) => setTime(event.target.value.toString())}/>
            <label htmlFor="Date">Date</label>
            <input name="Date" type="date" required="true" onInput={(event) => setDate(event.target.value.toString())}/>
            <button> Request </button>
          </form>
          </div>
          </div>
    )
  }
  
  export default RequestVisitPage;
