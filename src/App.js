import './static/css/App.css';
import Navbar from './components/all_pages/Navbar';
import Footer from './components/all_pages/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import AccountType from './pages/AccountType'
import HomebuyerRegister from './pages/HomebuyerRegister'
import PropertyRenterRegister from './pages/PropertyRenterRegister'
import BrokerRegister from './pages/BrokerRegister'
import Buy from './pages/Buy'
import Rent from './pages/Rent'
import BuyListing from './pages/BuyListing'
import RentListing from './pages/RentListing'
import Search from './pages/Search'
import Sell from './pages/Sell'
import HomebuyerProfile from './pages/HomebuyerProfile'
import PropertyRenterProfile from './pages/PropertyRenterProfile'
import BrokerProfile from './pages/BrokerProfile'
import RequestVisitPage from './pages/RequestVisitPage'
import EditProperty from './pages/EditProperty'
import EditBroker from './pages/EditBroker'
import Offer from './pages/Offer'
import Brokers from './pages/Brokers'
import BrokerInfo from './pages/BrokerInfo'
import BrokerProperties from './pages/BrokerProperties'
import GenericMortgageCalculator from './pages/GenericMortgageCalculator'
import MortgageCalculator from './pages/MortgageCalculator'
import BrokerReview from './pages/BrokerReview'
import axios from 'axios';
import { AccountContextProvider } from './helpers/AccountContext';


axios.defaults.baseURL = 'http://localhost:3001' 
axios.defaults.withCredentials = true;

function App() {
  return (
    <AccountContextProvider>
      <div className='App'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/Login' exact element={<Login />} />
            <Route path='/AccountType' exact element={<AccountType />} />
            <Route path='/HomebuyerRegister' exact element={<HomebuyerRegister />} />
            <Route path='/PropertyRenterRegister' exact element={<PropertyRenterRegister />} />
            <Route path='/BrokerRegister' exact element={<BrokerRegister />} />
            <Route path='/Search' exact element={<Search />} />
            <Route path='/Buy' exact element={<Buy />} />
            <Route path='/Rent' exact element={<Rent />} />
            <Route path='/Sell' exact element={<Sell />} />
            <Route path='/Offer' exact element={<Offer />} />
            <Route path='/EditProperty' exact element={<EditProperty />} />
            <Route path='/EditBroker' exact element={<EditBroker />} />
            <Route path='/BuyListing/' element={<BuyListing />} />
            <Route path='/RentListing/' element={<RentListing />} />
            <Route path='/RequestVisitPage' element={<RequestVisitPage/>} />
            <Route path='/BrokerInfo' element={<BrokerInfo/>} />
            <Route path='/BrokerProfile' element={<BrokerProfile/>}/>
            <Route path='/PropertyRenterProfile' element={<PropertyRenterProfile/>}/>
            <Route path='/HomebuyerProfile' element={<HomebuyerProfile/>}/>
            <Route path='/Brokers' element={<Brokers/>}/>
            <Route path='/BrokerProperties' element={<BrokerProperties/>}/>
            <Route path='/GenericMortgageCalculator' element={<GenericMortgageCalculator/>}/>
            <Route path='/MortgageCalculator' element={<MortgageCalculator/>}/>
            <Route path='/BrokerReview' element={<BrokerReview/>}/>
          </Routes>
          <Footer/>
        </Router>
      </div>
    </AccountContextProvider>
  );
}

export default App;
