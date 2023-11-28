import './static/css/App.css';
import Navbar from './components/all_pages/Navbar';
import Footer from './components/all_pages/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'
import NewLogin from './pages/NewLogin'
import AccountType from './pages/AccountType'
import HomebuyerRegister from './pages/HomebuyerRegister'
import PropertyRenterRegister from './pages/PropertyRenterRegister'
import BrokerRegister from './pages/BrokerRegister'
import Register from './pages/register'
import Buy from './pages/buy'
import Rent from './pages/rent'
import BuyListing from './pages/buy_listing'
import RentListing from './pages/rent_listing'
import Search from './pages/Search'
import Sell from './pages/Sell'
import Profile from './pages/profile'
import HomebuyerProfile from './pages/HomebuyerProfile'
import PropertyRenterProfile from './pages/PropertyRenterProfile'
import BrokerProfile from './pages/BrokerProfile'
import RequestVisitPage from './pages/RequestVisitPage'
import EditProperty from './pages/EditProperty'
import EditBroker from './pages/EditBroker'
import Offer from './pages/Offer'
import Brokers from './pages/brokers'
import BrokerInfo from './pages/BrokerInfo'
import BrokerProperties from './pages/BrokerProperties'
import GenericMortgageCalculator from './pages/GenericMortgageCalculator'
import MortgageCalculator from './pages/MortgageCalculator'
import BrokerReview from './pages/BrokerReview'
import axios from 'axios';
import { BrokerContextProvider } from './helpers/BrokerContext';
import { AccountContextProvider } from './helpers/AccountContext';


axios.defaults.baseURL = 'http://localhost:3001' 
axios.defaults.withCredentials = true;

function App() {
  return (
    <AccountContextProvider>
     {/* <BrokerContextProvider> */}
      <div className='App'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/NewLogin' exact element={<NewLogin />} />
            <Route path='/AccountType' exact element={<AccountType />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/HomebuyerRegister' exact element={<HomebuyerRegister />} />
            <Route path='/PropertyRenterRegister' exact element={<PropertyRenterRegister />} />
            <Route path='/BrokerRegister' exact element={<BrokerRegister />} />
            <Route path='/Search' exact element={<Search />} />
            <Route path='/buy' exact element={<Buy />} />
            <Route path='/rent' exact element={<Rent />} />
            <Route path='/Sell' exact element={<Sell />} />
            <Route path='/Offer' exact element={<Offer />} />
            <Route path='/EditProperty' exact element={<EditProperty />} />
            <Route path='/EditBroker' exact element={<EditBroker />} />
            <Route path='/buy_listing/' element={<BuyListing />} />
            <Route path='/rent_listing/' element={<RentListing />} />
            <Route path='/RequestVisitPage' element={<RequestVisitPage/>} />
            <Route path='/BrokerInfo' element={<BrokerInfo/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/BrokerProfile' element={<BrokerProfile/>}/>
            <Route path='/PropertyRenterProfile' element={<PropertyRenterProfile/>}/>
            <Route path='/HomebuyerProfile' element={<HomebuyerProfile/>}/>
            <Route path='/brokers' element={<Brokers/>}/>
            <Route path='/BrokerProperties' element={<BrokerProperties/>}/>
            <Route path='/GenericMortgageCalculator' element={<GenericMortgageCalculator/>}/>
            <Route path='/MortgageCalculator' element={<MortgageCalculator/>}/>
            <Route path='/BrokerReview' element={<BrokerReview/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
   {/* </BrokerContextProvider> */}
    </AccountContextProvider>
  );
}

export default App;
