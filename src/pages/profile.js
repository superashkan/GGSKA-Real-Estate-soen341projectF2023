import React, {useContext} from 'react'
import { BrokerContext } from '../helpers/BrokerContext'
import { Navigate } from 'react-router-dom'

function Profile() {
  const {ready, broker} = useContext(BrokerContext)
 
 if(ready && !broker){
  return <Navigate to={'/login'}/>
 }
 
  return (
    <div>account page for {broker?.name} </div>
  )
}

export default Profile
