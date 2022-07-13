import React,{ useState } from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Livelist from './components/pages/Livelist';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Categories from './components/pages/Categories';
import Productlist from './components/pages/Productlist';
import Product from './components/pages/Product';
import Mycart from './components/pages/Mycart';
import Adminhome from './Admin components/Admin pages/Adminhome';
import Adminlogin from './Admin components/Admin pages/Adminlogin';
import Adminsignup from './Admin components/Admin pages/Adminsignup';
import Admincategories from './Admin components/Admin pages/Admincategories';
import Adminaddproducts from './Admin components/Admin pages/Adminaddproducts';
import Admincurrencies from './Admin components/Admin pages/Admincurrencies';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/livelist' element={<Livelist/>}/>
          <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path='/signup' element={<Signup setIsAuth={setIsAuth}/>}/>
          <Route path='/categories' element={<Categories isAuth={isAuth} setIsAuth={setIsAuth} />}/>
          <Route path='/productlist' element={<Productlist isAuth={isAuth} setIsAuth={setIsAuth} />}/>
          <Route path='/products' element={<Product isAuth={isAuth} setIsAuth={setIsAuth}/> } />
          <Route path='/mycart' element={<Mycart isAuth={isAuth} setIsAuth={setIsAuth} /> }/>
          <Route path='/adminhome' element={<Adminhome adminAuth={adminAuth}/> }/>
          <Route path='/adminlogin' element={<Adminlogin setAdminAuth={setAdminAuth}/>}/>
          <Route path='/adminsignup' element={<Adminsignup adminAuth={adminAuth}/>}/>
          <Route path='/admincategories' element={<Admincategories adminAuth={adminAuth}/>}/>
          <Route path='/adminaddproducts' element={<Adminaddproducts adminAuth={adminAuth}/>}/>
          <Route path='/admincurrencies' element={<Admincurrencies adminAuth={adminAuth}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
