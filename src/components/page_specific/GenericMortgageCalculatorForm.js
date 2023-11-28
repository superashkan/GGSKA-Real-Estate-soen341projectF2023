import React, { useState } from 'react'
import "../../static/css/Login.css";
import axios from "axios"


function GenericMortgageCalculatorForm() {
  
  let [principalLoan, setPrincipalLoan] = useState("");
  let [annualInterestRate, setAnnualInterestRate] = useState("");
  let [loanLifetime, setLoanLifetime] = useState("");
  let [mortgageString, setMortgageString] = useState("");

  const neatlyFormatValue = function(value) {
    let newValueStr = "";
    let forwardPositionCounter = 0;
    for (let i = value.toString().length - 1;i >= 0;i--) {
      if ((forwardPositionCounter % 3 === 0 && forwardPositionCounter > 0)) {
        newValueStr = "," + newValueStr;
      }
      newValueStr = value.toString()[i] + newValueStr;
      forwardPositionCounter++;
    }
    return newValueStr;
  }

  const handleCalculation = async function(event) {
    event.preventDefault();
    if (principalLoan === null || principalLoan.toString().trim().length == 0) {
        alert("Error: Please enter a value for the principal loan amount");
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
    if (principalLoan <= 0) {
        alert("Error: Principal loan amount must be a non-zero positive value");
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
    axios.post('/genericCalculateMortgage', {principalLoan, monthlyInterestRate, numPayments}).then((response) => {
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
          <label htmlFor="principalLoan">Principal Loan Amount ($)</label>
          <input name="principalLoan" id="principalLoan" placeholder="Principal loan amount" type="number" required="true" onInput={(event) => setPrincipalLoan(event.target.value)}/>
          <label htmlFor="annualInterestRate">Annual Interest Rate (Provided by Lender) (%)</label>
          <input name="annualInterestRate" id="annualInterestRate" placeholder="Annual interest rate" type="number" required="true" onInput={(event) => setAnnualInterestRate(event.target.value)}/>
          <label htmlFor="loanLifetime">Number of Years in Loan Lifetime/Term</label>
          <input name="loanLifetime" id="loanLifetime" placeholder="Loan lifetime/term" type="number" required="true" onInput={(event) => setLoanLifetime(event.target.value)}/>
          <div id="monthlyMortgage">{mortgageString}</div>
        </form>
        <button className="form button" onClick={handleCalculation}> Calculate Monthly Mortgage </button>
        </div>
      );
    }

  return constructHTML();
}
export default GenericMortgageCalculatorForm
