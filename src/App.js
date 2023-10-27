import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'
import Register from './pages/register'
import Buy from './pages/buy'
import Rent from './pages/rent'
import Listing from './pages/listing'
import Search from './pages/Search'
import Sell from './pages/Sell'
import RequestVisitPage from './pages/requestvisitpage'


function App() {
  return (
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
            <Route path='/listing/:id' element={<Listing />} />
            <Route path='/requestvisitpage' element={<RequestVisitPage/>} />
          </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
