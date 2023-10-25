import './App.css';
import Navbar from './components/NewNavbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/new_home';
import Login from './pages/login'
import Register from './pages/register'
import Buy from './pages/buy'


function App() {
  return (
      <div className='App'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/buy' exact element={<Buy />} />
          </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
