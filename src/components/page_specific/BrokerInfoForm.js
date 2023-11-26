import {React, useState, useEffect} from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function BrokerInfoForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentEmail = location.state ? location.state.currentEmail : null;
  const currentPhone = location.state ? location.state.currentPhone : null;
  const currentName = location.state ? location.state.currentName : null;
  const currentAge = location.state ? location.state.currentAge : null;
  const currentAgency = location.state ? location.state.currentAgency : null;
  const currentLicenseNumber = location.state ? location.state.currentLicenseNumber : null;
  var [reviewList, setReviewList] = useState([]);

  const getBrokerReviews = () => axios.post('/findReviewsByBroker', {state: {brokerLicenseNumber: currentLicenseNumber}}).then(result => setReviewList(result.data))
  .catch((err)=>{
        console.log(err);
      });
  
  useEffect(() => {
    getBrokerReviews();
 });

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form">
        <label htmlFor="name">Full Name</label>
        <input name="name" value={currentName} type="text" readOnly={true}/>

        <label htmlFor="email">Email</label>
        <input name="email"  value={currentEmail} type="email" readOnly={true}/>

        <label htmlFor="newAge">Age</label>
        <input name="newAge"  value={currentAge} type="number" readOnly={true}/>

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" value={currentPhone} type="string" readOnly={true}/>

        <label htmlFor="licenseNumber">License Number</label>
        <input name="licenseNumber" value={currentLicenseNumber} type="number" readOnly={true}/>

        <label htmlFor="agency">Name of Agency</label>
        <input name="agency" value={currentAgency} type="string" readOnly={true}/>
        <button className="propertySearchButton" onClick = {(event) => {
                        return navigate('/BrokerProperties', {state: {
                          brokerEmail: currentEmail,
                          brokerName: currentName
                        }});
                      }
                    }>
                View Listings
        </button>
        <button className="propertySearchButton" onClick = {(event) => {
                        return navigate('/BrokerReview', {state: {
                          currentEmail: currentEmail,
                          currentPhone: currentPhone,
                          currentName: currentName,
                          currentAge: currentAge,
                          currentAgency: currentAgency,
                          currentLicenseNumber: currentLicenseNumber
                        }});
                      }
                    }>
                Submit Review of Broker
        </button>
        <br />
        <h1>Reviews of {currentName}</h1>
        <table>
          <thead>
            <tr>
              <th>Star Rating (1-5)</th>
              <th>Comment(s)</th>
              <th className="emptyCell"></th>
            </tr>
          </thead>
          <tbody>
          {reviewList.map((review) => {
            return (
              <tr>
                <td>{review.stars}</td>
                <td>{review.comments}</td>
              </tr>
            )})
          }
          </tbody>
        </table>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default BrokerInfoForm
