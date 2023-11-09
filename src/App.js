import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register'
import Buy from './pages/buy'
import Rent from './pages/rent'
import BuyListing from './pages/buy_listing'
import RentListing from './pages/rent_listing'
import Search from './pages/Search'
import Sell from './pages/Sell'
import Profile from './pages/profile'
import RequestVisitPage from './pages/requestvisitpage'
import EditProperty from './pages/EditProperty'
import EditBroker from './pages/EditBroker'
import Offer from './pages/Offer'
import Brokers from './pages/brokers'
import axios from 'axios';
import { BrokerContextProvider } from './helpers/BrokerContext';

axios.defaults.baseURL = 'http://localhost:3001' 
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrokerContextProvider>
      <div className='App'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/Search' exact element={<Search />} />
            <Route path='/buy' exact element={<Buy />} />
            <Route path='/rent' exact element={<Rent />} />
            <Route path='/Sell' exact element={<Sell />} />
            <Route path='/Offer' exact element={<Offer />} />
            <Route path='/EditProperty' exact element={<EditProperty />} />
            <Route path='/EditBroker' exact element={<EditBroker />} />
            <Route path='/buy_listing/' element={<BuyListing />} />
            <Route path='/rent-listing/:id' element={<RentListing />} />
            <Route path='/RequestVisitPage' element={<RequestVisitPage/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/brokers' element={<Brokers/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
   </BrokerContextProvider>
  );
}

export default App;
