import React,{ useState } from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Livelist from './components/pages/Livelist';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Forgetpassword from './components/pages/Forgetpassword';
import Categories from './components/pages/Categories';
import Productlist from './components/pages/Productlist';
import Product from './components/pages/Product';
import Mycart from './components/pages/Mycart';
import Mycartbuynow from './components/pages/Mycartbuynow';
import Marketplaceorders from './components/pages/Marketplaceorders';
import Marketplaceordersdetails from './components/pages/Marketplaceordersdetails';
import InvestmentHome from './components/pages/Investmentshome';
import InvestmentList from './components/pages/Investmentlist';
import InvestmentDetails from './components/pages/Investmentdetails';
import Investmentorders from './components/pages/Investmentorders';
import Investmentorderdetails from './components/pages/Investmentorderdetails';
import Exchanges from './components/pages/Exchange';
import Exchangeorders from './components/pages/Exchangeorders';
import Exchangeorderdetails from './components/pages/Exchangeorderdetails';
import Adminhome from './Admin components/Admin pages/Adminhome';
import Adminlogin from './Admin components/Admin pages/Adminlogin';
import Adminsignup from './Admin components/Admin pages/Adminsignup';
import Admincategories from './Admin components/Admin pages/Admincategories';
import Adminaddproducts from './Admin components/Admin pages/Adminaddproducts';
import Admincurrencies from './Admin components/Admin pages/Admincurrencies';
import Adminmarketplaceorders from './Admin components/Admin pages/Adminmarketplaceorders';
import Adminmarketplaceorderdetails from './Admin components/Admin pages/Adminmarketplaceorderdetails';
import Admincategorieslist from './Admin components/Admin pages/Admincategorieslist';
import AdminProductList from './Admin components/Admin pages/Adminproductlist';
import Adminproducts from './Admin components/Admin pages/Adminproducts';
import Admineditproducts from './Admin components/Admin pages/Admineditproduct';
import Adminaddinvestmenst from './Admin components/Admin pages/Adminaddinvestments';
import Admininvestmentorders from './Admin components/Admin pages/Admininvestmentorders';
import Admininvestmentorderdetails from'./Admin components/Admin pages/Admininvestmentorderdetails';
import Adminexchangeorders from './Admin components/Admin pages/Adminexchangeorders';
import Adminexchangeorderdetails from './Admin components/Admin pages/Adminexchangeorderdetails';
import Adminrecomandationlist from './Admin components/Admin pages/Adminrecomandations';

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
          <Route path='/forgetpassword' element={<Forgetpassword/>}/>
          <Route path='/categories' element={<Categories isAuth={isAuth} setIsAuth={setIsAuth} />}/>
          <Route path='/productlist' element={<Productlist isAuth={isAuth} setIsAuth={setIsAuth} />}/>
          <Route path='/products' element={<Product isAuth={isAuth} setIsAuth={setIsAuth}/> } />
          <Route path='/mycart' element={<Mycart isAuth={isAuth} setIsAuth={setIsAuth} /> }/>
          <Route path='/mycartbuynow' element={<Mycartbuynow isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/mymarketplaceorders' element={<Marketplaceorders isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/mymarketplaceordersdetails' element={<Marketplaceordersdetails isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/investments' element={<InvestmentHome isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/investmentslist' element={<InvestmentList isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/investmentdetails' element={<InvestmentDetails isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/myinvestmentorders' element={<Investmentorders isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/myinvestmentorderdetails' element={<Investmentorderdetails isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/exchanges' element={<Exchanges isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/myexchangeorders' element={<Exchangeorders isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/myexchangeorderdetails' element={<Exchangeorderdetails isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route path='/adminhome' element={<Adminhome adminAuth={adminAuth}/> }/>
          <Route path='/adminlogin' element={<Adminlogin setAdminAuth={setAdminAuth}/>}/>
          <Route path='/adminsignup' element={<Adminsignup adminAuth={adminAuth}/>}/>
          <Route path='/admincategories' element={<Admincategories adminAuth={adminAuth}/>}/>
          <Route path='/adminaddproducts' element={<Adminaddproducts adminAuth={adminAuth}/>}/>
          <Route path='/admincurrencies' element={<Admincurrencies adminAuth={adminAuth}/>}/>
          <Route path='/adminmarketplaceorders' element={<Adminmarketplaceorders adminAuth={adminAuth}/>}/>
          <Route path='/adminmarketplaceorderdetails' element={<Adminmarketplaceorderdetails adminAuth={adminAuth}/>}/>
          <Route path='/admincategorieslist' element={<Admincategorieslist adminAuth={adminAuth}/>}/>
          <Route path='/adminproductlist' element={<AdminProductList adminAuth={adminAuth}/>}/>
          <Route path='/adminproducts' element={<Adminproducts adminAuth={adminAuth}/>}/>
          <Route path='/admineditproducts' element={<Admineditproducts adminAuth={adminAuth}/>}/>
          <Route path='/adminaddinvestments' element={<Adminaddinvestmenst adminAuth={adminAuth}/>}/>
          <Route path='/admininvestmentorders' element={<Admininvestmentorders adminAuth={adminAuth}/>}/>
          <Route path='/admininvestmentorderdetails' element={<Admininvestmentorderdetails adminAuth={adminAuth}/>}/>
          <Route path='/adminexchangeorders' element={<Adminexchangeorders adminAuth={adminAuth}/>}/>
          <Route path='/adminexchangeorderdetails' element={<Adminexchangeorderdetails adminAuth={adminAuth}/>}/>
          <Route path='/adminrecomandations' element={<Adminrecomandationlist adminAuth={adminAuth}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
