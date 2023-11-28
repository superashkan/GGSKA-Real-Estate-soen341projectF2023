import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../static/css/Login.css'
import { useNavigate } from 'react-router-dom';

function BrokerForm() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone,setPhone] = useState('');
  const [licenseNumber,setLicenseNumber] = useState('');
  const [agency,setAgency] = useState('');
  const [brokerList, setBrokerList] = useState([]);
  const [haveBrokersBeenFound, setHaveBrokersBeenFound] = useState(false);

  const getAllBrokers = () => {
    axios.get('/getAllBrokerAccounts').then(result => {
      setBrokerList(result.data);
      console.log(result.data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  useEffect(() => {
    if (brokerList.length === 0 && !haveBrokersBeenFound) {
      getAllBrokers();
      setHaveBrokersBeenFound(true);
    }
  })

  const performChecks = function() {
    var doesRepeatExist = false;
    brokerList.forEach((broker) => {
      console.log("license_number: " + broker.license_number);
      console.log("licenseNumber: " + licenseNumber);
      if (parseInt(broker.license_number) === parseInt(licenseNumber)) {
        doesRepeatExist = true;
      }
    })
    if (doesRepeatExist) {
      alert ("Error: Duplicate license number");
    }
    return doesRepeatExist;
  }
  
  const registerBroker = async function (ev) {
    ev.preventDefault();
    const check = performChecks();
    if (check) {
      return;
    }
    try {
      await axios.post('/register_new', {
        accountType: "Broker",
        name: name,
        email: email,
        password: password,
        age: age,
        phone: phone,
        licenseNumber: licenseNumber,
        agency: agency
      });
      alert('Registration successful. Now you can log in');
      return navigate('/NewLogin');
    } 
    
    catch (e) {
      alert('Registration failed. Please try again later');
    }

  }


  return (
      <form id="contact-form" onSubmit={registerBroker}>
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="age">Age</label>
        <input name="age" placeholder="Enter age..." type="number" onChange={(e) => setAge(e.target.value)}/>

        <label htmlFor="phone">Phone Number</label>
        <input name="phone" placeholder="Enter phone number..." type="string" onChange={(e) => setPhone(e.target.value)}/>

        <label htmlFor="licenseNumber">License Number</label>
        <input name="licenseNumber" placeholder="Enter license number..." type="number" onChange={(e) => setLicenseNumber(e.target.value)}/>

        <label htmlFor="agency">Name of Agency</label>
        <input name="agency" placeholder="Enter the name of your agency..." type="string" onChange={(e) => setAgency(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input name="password" placeholder="Enter password..." type="password" onChange={(e) => setPassword(e.target.value)}/>

        <div className='notRegistered'>
        <Link to='/login'> Already registered? Login</Link>
        </div>  

        <button type="submit"> Register </button>
      </form>
  )
}

export default BrokerForm