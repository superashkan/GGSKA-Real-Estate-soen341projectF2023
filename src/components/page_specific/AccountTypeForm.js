import {React, useState } from 'react'
import "../../static/css/MultiPageCSS.css";
import {useNavigate} from "react-router-dom";

function AccountTypeForm() {

  const navigate = useNavigate();
  let [accountType, setAccountType] = useState("");


  const handleRedirect = async function(event) {
    try{
      let isCreationOkay = performChecks();
      if (!isCreationOkay) {
        event.preventDefault();
        return;
      }
      if (accountType === "Homebuyer") {
        return navigate('/HomebuyerRegister');
      }
      if (accountType === "Property Renter") {
        return navigate('/PropertyRenterRegister');
      }
      if (accountType === "Broker") {
        return navigate('/BrokerRegister');
      }
    }
    catch (e){
      alert(e);
    }
  }

  const performChecks = function() {
    if (accountType == "") {
      alert("Please select an option.")
      return false;
    }
    return true;
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form" onSubmit={handleRedirect}>
          <label htmlFor="accountType">What type of account are you looking to create?</label>
          <select name="accountType" id="accountType" defaultValue="" required="true" className="dropdown" onInput={(event) => setAccountType(event.target.value)}>
            <option value="" disabled>Type of Account</option>
            <option value="Homebuyer">Homebuyer</option>
            <option value="Property Renter">Property Renter</option>
            <option value="Broker">Broker</option>
          </select>
          <button className="button" type="submit"> Finish Account Creation </button>
        </form>
        </div>
      );
    }

  return constructHTML();
}
export default AccountTypeForm