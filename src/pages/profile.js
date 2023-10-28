import React, {UseContext} from 'react'
import { BrokerContext } from '../helpers/BrokerContext'
import { Navigate } from 'react-router-dom'

function profile() {
  const {ready, broker} = UseContext(BrokerContext)
 
 if(ready && !broker){
  return <Navigate to={'/login'}/>
 }
 
  return (
    <div>account page for {broker?.name} </div>
  )
}

export default profile
