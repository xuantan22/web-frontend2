import React, { useContext, useState } from 'react'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
const Narbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getToTalProduct} = useContext(ShopContext);
    const [token, setToken]=useState(localStorage.getItem('auth-token'));
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src ={logo} alt=""/>
            <Link style={{textDecoration:'none'}} to="/"><p>E-COMMERCE</p></Link>
        </div>
            <ul className='nav-menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:"none"}} to="/">Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:"none"}} to="/mens">Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:"none"}} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:"none"}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            </ul>
        <div className='nav-login-cart'>
            <Link to="/cart"><img src={cart_icon} alt=""/></Link>
            <div className='nav-cart-count'><p>{getToTalProduct()}</p></div>
            {token?
            <Link to ="/login"><button onClick={() =>{setToken(localStorage.removeItem('auth-token'))}}>Logout</button></Link>
            :<Link to ="/login"><button>Login</button></Link>
            }
        </div>
    </div>
  )
}

export default Narbar