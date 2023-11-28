import React from 'react'
import AccountTypeForm from '../components/page_specific/AccountTypeForm.js';
import "../static/css/MultiPageCSS.css";

function AccountType() {
  return (
    <div>
      <div className='title'>
        <h1> Type of Account </h1>
      </div>
      <div>
        <AccountTypeForm />
      </div>
    </div>
  )
}

export default AccountType