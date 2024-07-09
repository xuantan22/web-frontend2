import './App.css';
import Narbar from './components/Navbar/Narbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kid_banner from './components/Assets/banner_kids.png'
import LoginSignup from './Pages/LoginSignup';
import Personnel from './Pages/Personnel/Personnel';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import VerifyOrder from './Pages/VerifyOrder/VerifyOrder';
import MyOrders from './Pages/MyOrders/MyOrders';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Narbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/personnelpage' element={<Personnel/>} />
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<VerifyOrder/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
