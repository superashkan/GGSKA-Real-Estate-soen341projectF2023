import React, { useState } from 'react'
import "../../static/css/Login.css";
import axios from "axios"
import {useLocation} from 'react-router-dom'
import { neatlyFormatValue } from '../../helpers/HelperFunctions';


function MortgageCalculatorForm() {
  
  const location = useLocation();
  const homePrice = location.state ? parseFloat(location.state.homePrice) : 0;
  let [downPayment, setDownPayment] = useState("");
  let [annualInterestRate, setAnnualInterestRate] = useState("");
  let [loanLifetime, setLoanLifetime] = useState("");
  let [mortgageString, setMortgageString] = useState("");

  const handleCalculation = async function(event) {
    event.preventDefault();
    if (downPayment === null || downPayment.toString().trim().length == 0) {
        alert("Error: Please enter a value for the down payment");
        return;
    }
    if (downPayment >= homePrice) {
        alert("Error: Down payment must be less than home price");
        return;
    }
    if (annualInterestRate === null || annualInterestRate.toString().trim().length == 0) {
        alert("Error: Please enter a value for the annual interest rate");
        return;
    }
    if (loanLifetime === null || loanLifetime.toString().trim().length == 0) {
        alert("Error: Please enter a value for the number of years in the loan lifetime/term");
        return;
    }
    if (annualInterestRate <= 0) {
        alert("Error: Annual interest rate must be a non-zero positive value");
        return;
    }
    if (annualInterestRate > 100) {
        alert("Error: Annual interest rate cannot be greater than 100%");
        return;
    }
    if (loanLifetime <= 0) {
        alert("Error: Number of years in loan lifetime/term must be a non-zero positive value");
        return;
    }
    let monthlyInterestRate = parseFloat((annualInterestRate / 100) / 12.0);
    let numPayments = loanLifetime * 12;
    axios.post('/calculateMortgage', {homePrice, downPayment, monthlyInterestRate, numPayments}).then((response) => {
        console.log(response);
        setMortgageString("Your monthly mortgage is $" + neatlyFormatValue(response.data.monthlyMortgage));
    })
    .catch((err)=>{
        console.log(err);
      });
  }

  const constructHTML = function() {
      return (
        <div>
        <form id="search-form">
        <label htmlFor="homePrice">Home Price ($)</label>
          <input name="homePrice" id="homePrice" type="number" value={homePrice}/>
          <label htmlFor="downPayment">Down Payment ($)</label>
          <input name="downPayment" id="downPayment" placeholder="Down payment" type="number" required="true" onInput={(event) => setDownPayment(parseFloat(event.target.value))}/>
          <label htmlFor="annualInterestRate">Annual Interest Rate (Provided by Lender) (%)</label>
          <input name="annualInterestRate" id="annualInterestRate" placeholder="Annual interest rate" type="number" required="true" onInput={(event) => setAnnualInterestRate(parseFloat(event.target.value))}/>
          <label htmlFor="loanLifetime">Number of Years in Loan Lifetime/Term</label>
          <input name="loanLifetime" id="loanLifetime" placeholder="Loan lifetime/term" type="number" required="true" onInput={(event) => setLoanLifetime(parseFloat(event.target.value))}/>
          <div id="monthlyMortgage">{mortgageString}</div>
        </form>
        <button className="form button" onClick={handleCalculation}> Calculate Monthly Mortgage </button>
        </div>
      );
    }

  return constructHTML();
}
export default MortgageCalculatorForm
