import {React, useState, useContext, useEffect } from 'react';
import '../styles/RequestVisitPage.css';
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {Link, useNavigate, useLocation} from "react-router-dom";

function RequestVisitPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state.address;
  var [visitorName, setVisitorName] = useState("");
  var [date, setDate] = useState("");
  var [time, setTime] = useState("");

  const handleVisitScheduling = async function(event) {
    try{
      const {data} = await axios.post('/createVisit', {address, visitorName, date, time});
      alert('Visit scheduling successful')
      return navigate('/Sell');
    }
    catch (e){
      alert(e);
    }
  }

    return (
        <div className="visitForm">

          <h1> Request a property visit </h1>

          <div>
          <form id="search-form" onSubmit={handleVisitScheduling}>
            <label htmlFor="name">Full Name</label>
            <input name="name" placeholder="Enter full name..." type="text" onInput={(event) => setVisitorName(event.target.value)}/>
            <label htmlFor="Time">24 Hour Time</label>
            <input time="time" placeholder="Enter time in 30 minute intervals" type="text" onInput={(event) => setTime(event.target.value)}/>
            <label htmlFor="Date">Date</label>
            <input name="Date" placeholder="0000/00/00" type="text" onInput={(event) => setDate(event.target.value)}/>
            <button> Request </button>
          </form>
          </div>
          </div>
    )
  }
  
  export default RequestVisitPage;
