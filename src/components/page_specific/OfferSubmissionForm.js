import {React, useContext, useState, useEffect } from 'react'
import "../../static/css/MultiPageCSS.css";
import axios from "axios";
import { BrokerContext } from '../../helpers/BrokerContext'
import {useNavigate, useLocation} from "react-router-dom";
import { isNullOrEmpty, neatlyFormatValue } from '../../helpers/HelperFunctions';

function OfferSubmissionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {broker} = useContext(BrokerContext);
  const currentAddress = location.state ? location.state.currentAddress : null;
  var [offer, setOffer] = useState("");
  var [brokerName, setBrokerName] = useState("");
  var [brokerLicense, setBrokerLicense] = useState("");
  var [brokerAgency, setBrokerAgency] = useState("");
  var [clientInfo, setClientInfo] = useState("");
  var [deedDate, setDeedDate] = useState("");
  var [occupancyDate, setOccupancyDate] = useState("");
  var [highestID, setHighestID] = useState("");
  var [offerList, setOfferList] = useState([]);

  const findOffersByAddress = () => {
    axios.post('/findOffersByAddress', {currentAddress: currentAddress}).then(result => setOfferList(result.data))
    .catch((err)=>{
      console.log(err);
    });
  }

  const getHighestID = () => {
    axios.post('/findOffers').then(result => {
      var highest = 0;
      result.data.forEach((offer) => {
        if (parseInt(offer.offerID) > highest) {
          highest = offer.offerID;
        }
        highest++;
        setHighestID(highest);
      })
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  
  useEffect(() => {
    findOffersByAddress();
    getHighestID();
    if (broker) {
      setBrokerAgency(broker?.agency);
      setBrokerLicense(broker?.license_number);
      setBrokerName(broker?.name);
    }
 }, []);

  const handleOffer = async function(event) {
    try{
        if (isNullOrEmpty(offer)) {
            alert("Error: Please enter a valid, positive monetary offer");
            return;
        }
        if (offer <= 0) {
            alert("Error: Please enter a positive monetary offer");
            return;
        }
      axios.post('/submitOffer', {currentAddress, highestID, offer, brokerName, brokerLicense, brokerAgency, clientInfo, deedDate, occupancyDate});
      alert("Offer submitted!");
      return navigate('/buy_listing', {state: {
        address: currentAddress
      }});
    }
    catch (e){
      alert(e);
    }
  }

  const constructHTML = function() {
    if (offerList.length == 0) {
      return (
        <div>
        <form id="search-form" onSubmit={handleOffer}>
          <label htmlFor="brokerName">Full Name</label>
          <input name="brokerName" value={brokerName} type="text" />

          <label htmlFor="brokerLicense">License Number</label>
          <input name="brokerLicense" value={brokerLicense} type="text" />

          <label htmlFor="brokerAgency">Agency</label>
          <input name="brokerAgency" value={brokerAgency} type="text" />

          <label htmlFor="address">Property Address</label>
          <input name="address" id="address" value={currentAddress} type="string" />

          <label htmlFor="clientInfo">Client Information (Name(s), Address(es), Email(s))</label>
          <textarea name="clientInfo" id="clientInfo" required="true" type="text" rows="4" columns="50" onInput={(event) => setClientInfo(event.target.value)}/>

          <label htmlFor="offer">Offer</label>
          <input name="offer" id="offer" required="true" placeholder="Offer ($)" type="number" onInput={(event) => setOffer(event.target.value)}/>

          <label htmlFor="deedDate">Date of the Deed of Sale</label>
          <input name="deedDate" required="true" type="date" onInput={(event) => setDeedDate(event.target.value.toString())}/>

          <label htmlFor="occupancyDate">Premises Occupancy Date</label>
          <input name="occupancyDate" required="true" type="date" onInput={(event) => setOccupancyDate(event.target.value.toString())}/>

          <button className="button" type="submit"> Make Offer </button>
        </form>
        </div>
      );
    } else {
        return (
            <div>
        <form id="search-form" onSubmit={handleOffer}>
          <label htmlFor="brokerName">Full Name</label>
          <input name="brokerName" value={brokerName} type="text" />

          <label htmlFor="brokerLicense">License Number</label>
          <input name="brokerLicense" value={brokerLicense} type="text" />

          <label htmlFor="brokerAgency">Agency</label>
          <input name="brokerAgency" value={brokerAgency} type="text" />

          <label htmlFor="address">Property Address</label>
          <input name="address" id="address" value={currentAddress} type="string" />

          <label htmlFor="clientInfo">Client Information (Name(s), Address(es), Email(s))</label>
          <textarea name="clientInfo" id="clientInfo" required="true" type="text" rows="4" columns="50" onInput={(event) => setClientInfo(event.target.value)}/>

          <label htmlFor="offer">Offer</label>
          <input name="offer" id="offer" required="true" placeholder="Offer ($)" type="number" onInput={(event) => setOffer(event.target.value)}/>

          <label htmlFor="deedDate">Date of the Deed of Sale</label>
          <input name="deedDate" required="true" type="date" onInput={(event) => setDeedDate(event.target.value.toString())}/>

          <label htmlFor="occupancyDate">Premises Occupancy Date</label>
          <input name="occupancyDate" required="true" type="date" onInput={(event) => setOccupancyDate(event.target.value.toString())}/>

          <button className="button" type="submit"> Make Offer </button>
        </form>
        <br />
        <h1>Existing Offers</h1>
        <table>
            <thead>
                <tr>
                    <th>Offer</th>
                    <th>Broker Name</th>
                    <th>Deed of Sale Date</th>
                    <th>Premises Occupancy Date</th>
                </tr>
            </thead>
            <tbody>
            {offerList.map((offer) => {
                return (
                    <tr>
                        <td>${neatlyFormatValue(offer.offer)}</td>
                        <td>{offer.brokerName}</td>
                        <td>{offer.deedDate}</td>
                        <td>{offer.occupancyDate}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
        </div>
        )
    }
  }
  return constructHTML();
}
export default OfferSubmissionForm
