import {React, useState, useContext, useEffect } from 'react';
import '../styles/RequestVisitPage.css';
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {Link, useNavigate, useLocation} from "react-router-dom";

function RequestVisitPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state ? location.state.address : null;
  const buyOrRent = location.state ? location.state.buyOrRent : 'buy';
  var [visitorName, setVisitorName] = useState("");
  var [date, setDate] = useState("");
  var [time, setTime] = useState("");

  const handleVisitScheduling = async function(event) {
    try{
      const {data} = axios.post('/createVisit', {address, visitorName, date, time});
      alert('Visit scheduling successful')
      if (buyOrRent == 'buy') {
        return navigate('/buy_listing', {state: {
          address: address
        }});
      }
      if (buyOrRent == 'rent') {
        return navigate('/rent_listing', {state: {
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
            <input name="name" placeholder="Enter full name..." type="text" onInput={(event) => setVisitorName(event.target.value)}/>
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
