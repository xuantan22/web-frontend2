import React, { useContext, useEffect, useState } from 'react'
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import navProfile from '../Assets/nav-profile.svg'
import LanguageIcon from '@mui/icons-material/Language';
import Cookies from 'js-cookie';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const Narbar = () => {
    const id = Cookies.get('userId');
    const [menu, setMenu] = useState("shop");
    const { getToTalProduct } = useContext(ShopContext);
    const [token, setToken] = useState(localStorage.getItem('auth-token'));
    const [drop, setDrop] = useState(false);
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        fetch(`https://web-frontend2.vercel.app/getcurrentuser/${id}`)
          .then((res) => res.json())
          .then((user) => setAvatar(user.image));
      }, [id]);
    const handleDrop = () => {
        setDrop((prev) => !prev);
    }
   
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <Link style={{ textDecoration: 'none' }} to="/"><p>E-COMMERCE</p></Link>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: "none" }} to="/">Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: "none" }} to="/mens">Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: "none" }} to="/womens">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: "none" }} to="/kids">Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'><p>{getToTalProduct()}</p></div>
                {token ?
                    <Link to="/login"><button onClick={() => { setToken(localStorage.removeItem('auth-token')) }}>Logout</button></Link>
                    : <Link to="/login"><button>Login</button></Link>
                }

            </div>
            <div className='nav-avatar' onClick={handleDrop}>
                <img alt='avatar' src={avatar? avatar: navProfile} />
                {drop ? <div className='nav-avatar-menu'>
                    <a href='/personnelpage'>
                        <PersonIcon/>
                        Ho So Ca Nhan
                    </a>
                    <a>
                        <LogoutIcon/>Logout
                    </a>
                    <a>
                        <SettingsIcon/>Cai Dat
                    </a>
                    <a>
                        <LanguageIcon />
                        Ngon Ngu
                    </a>
                </div> : <></>
                }

            </div>
        </div>
    )
}

export default Narbar
