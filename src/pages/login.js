import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { BrokerContext } from "../helpers/BrokerContext";



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setBroker} = useContext(BrokerContext);
  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try{
      const {data} = await axios.post('/login', {email,password});
      setBroker(data);
      alert('Login successful')
      setRedirect(true);
    }
    catch (e){
      alert('Login failed')
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
        <div>
            <h1 className='title'> Login </h1>
    
            <form id="contact-form" onSubmit={handleLoginSubmit}>

              <label htmlFor="email">Email</label>
              <input name="email" placeholder="Enter email..." type="email" onChange={ev => setEmail(ev.target.value)}/>

              <label htmlFor="password">Password</label>
              <input name="password" placeholder="Enter password..." type="password" onChange={ev => setPassword(ev.target.value)}/>

              <div className='notRegistered'>
              <Link to='/register'> Not yet registered? Do it now!</Link>
              </div>  

              <button type="submit"> Login </button>
            </form>
        </div>
      );
    }
    

export default Login
