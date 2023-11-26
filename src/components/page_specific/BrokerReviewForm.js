import {React, useState} from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import { isNullOrEmpty } from '../../helpers/HelperFunctions';

function BrokerReviewForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentEmail = location.state ? location.state.currentEmail : null;
  const currentPhone = location.state ? location.state.currentPhone : null;
  const currentName = location.state ? location.state.currentName : null;
  const currentAge = location.state ? location.state.currentAge : null;
  const currentAgency = location.state ? location.state.currentAgency : null;
  const currentLicenseNumber = location.state ? location.state.currentLicenseNumber : null;
  let [numStars, setNumStars] = useState("");
  let [comments, setComments] = useState("");


  const handleReviewSubmit = async function(event) {
    try{
        if (isNullOrEmpty(numStars)) {
            alert("Error: Please enter a star rating");
            return;
        }
        if (isNullOrEmpty(comments)) {
            alert("Error: Please enter one or more comments regarding the broker");
            return;
        }
      axios.post('/submitReview', {
        brokerLicenseNumber: currentLicenseNumber, 
        numStars: numStars, 
        comments: comments
      });
      alert('Review submission successful.');
      return navigate('/BrokerInfo', {state: {
        currentEmail: currentEmail,
        currentPhone: currentPhone,
        currentName: currentName,
        currentAge: currentAge,
        currentAgency: currentAgency,
        currentLicenseNumber: currentLicenseNumber
      }});
    }
    catch (e){
      alert(e);
    }
  }

  const constructHTML = function() {
    return (
      <div>
      <form id="search-form" onSubmit={handleReviewSubmit}>
      <label htmlFor="licenseNumber">Broker Name</label>
      <input name="name" value={currentName} type="text" readOnly={true}/>

      <label htmlFor="licenseNumber">Broker License Number</label>
      <input name="licenseNumber" value={currentLicenseNumber} type="number" readOnly={true}/>

      <label htmlFor="rating">Star Rating</label>
      <select id="rating" name="rating" defaultValue="" className="dropdown" required={true} onInput={(event) => setNumStars(event.target.value)}>
        <option value="" disabled>Select Rating</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
      </select>
      <label htmlFor="comments">Comment(s)</label>
      <textarea name="comments" id="comments" required={true} placeholder="Comment(s) about the broker go here." type="text" rows="4" cols="50" onInput={(event) => setComments(event.target.value)}/>
      <button className="button" type="submit">Submit Review</button>
      </form>
      </div>
    );
  }

  return constructHTML();
}

export default BrokerReviewForm



