import {React, useState, useEffect } from 'react'
import "../styles/MultiPageCSS.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function OfferSubmissionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentAddress = location.state.currentAddress;
  var [offer, setOffer] = useState("");
  var [errorMessage, setErrorMessage] = useState("Please input a valid, non-negative offer.");
  var [offerList, setOfferList] = useState([]);

  const isNullOrEmpty = function(stringInput) {
    if (stringInput === null || (stringInput === undefined || stringInput.toString().trim() === "")) {
      return true;
    } else {
      return false;
    }
  }

  const neatlyFormatValue = function(value) {
    value = value.toString();
    var newValueStr = "";
    var forwardPositionCounter = 0;
    for (var i = value.length - 1;i >= 0;i--) {
      if (!value.toString().includes(".")) {
        if (forwardPositionCounter % 3 == 0 && forwardPositionCounter > 0) {
          newValueStr = "," + newValueStr;
        }
      } else {
        if (forwardPositionCounter % 3 && forwardPositionCounter > 0) {
          if ((newValueStr[i] != "," && newValueStr[i + 1] != ",") && (newValueStr[i + 2] != "," && newValueStr[i + 3] != ",")) {
            if ((value.toString()[i] != "." && value.toString()[i + 1] != ".") && (value.toString()[i + 2] != "." && value.toString()[i + 3] != ".")) {
              newValueStr = "," + newValueStr;
            }
          }
        }
        if (newValueStr.length > 6) {

        }
      }
      newValueStr = value.toString()[i] + newValueStr;
      forwardPositionCounter++;
    }
    return newValueStr;
  }

  const findOffersByAddress = () => {
    axios.post('/findOffersByAddress', {currentAddress: currentAddress}).then(result => setOfferList(result.data));
  }
  
  useEffect(() => {
    findOffersByAddress();
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
      const {data} = await axios.post('/submitOffer', {currentAddress, offer});
      console.log("data: ");
      console.log(data);
      alert('Property offer request successful');
      return navigate('/Sell');
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
          <label htmlFor="address">Property Address</label>
          <input name="address" id="address" value={currentAddress} type="string" />
          <label htmlFor="offer">Offer</label>
          <input name="offer" id="offer" placeholder="Offer ($)" type="number" onInput={(event) => setOffer(event.target.value)}/>

          <div id="errorMessage">{errorMessage}</div>
          <button className="button" type="submit"> Edit Property </button>
        </form>
        </div>
      );
    } else {
        return (
            <div>
        <form id="search-form" onSubmit={handleOffer}>
          <label htmlFor="address">Property Address</label>
          <input name="address" id="address" value={currentAddress} type="string" />
          <label htmlFor="offer">Offer</label>
          <input name="offer" id="offer" placeholder="Offer ($)" type="number" onInput={(event) => setOffer(event.target.value)}/>

          <div id="errorMessage">{errorMessage}</div>
          <button className="button" type="submit"> Make Offer </button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>Existing Offer(s)</th>
                </tr>
            </thead>
            <tbody>
            {offerList.map((offer) => {
                return (
                    <tr>
                        <td>${neatlyFormatValue(offer.offer)}</td>
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
