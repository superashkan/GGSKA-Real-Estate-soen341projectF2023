import React from 'react';
import '../styles/RequestVisitPage.css';

function requestvisitpage() {
    return (
        <div>

        <h1 className="buyListing" > REQUEST PROPERTY VISIT </h1>

        <div className='title'>
        <label htmlFor="name">Full Name</label>
              <input name="name" placeholder="Enter full name..." type="text" />
              <label htmlFor="Time">24 Hour Time</label>
              <input time="time" placeholder="Enter time in 30 minute intervals" type="text" />
              <label htmlFor="Date">Date</label>
              <input name="Date" placeholder="0000/00/00" type="text" />
            <button> Request </button>
              </div>

            </div>
    )
  }
  
  export default requestvisitpage;
