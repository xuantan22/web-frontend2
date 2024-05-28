import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import vnpay_icon from '../Assets/vnpay_icon.png'
import visa_icon from '../Assets/visa_icon.png'
import jcb_logo from '../Assets/jcb_logo.png'
import cod_logo from '../Assets/cod_logo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-category'>
            <div className='footer-service'>
                <p>Customer Service</p>
                <ul>
                    <li>Support Center</li>
                    <li>Shopping Guide</li>
                    <li>Payment</li>
                    <li>Transition</li>
                    <li>Guarantee Policy</li>
                </ul>
            </div>
            <div className='footer-payment'>
                <p>Payment</p>
                <ul>
                    <li><img src={visa_icon} alt=""/></li>
                    <li><img src={vnpay_icon} alt=""/></li>
                    <li><img src={jcb_logo} alt=""/></li>
                    <li><img src={cod_logo} alt=""/></li>

                </ul>
            </div>
            <div className='footer-icons-container '>
                <p>Follow Us</p>
                <img src={instagram_icon} alt='' />
                <img src={pintester_icon} alt=''/>
                <img src={whatsapp_icon} alt=''/>

            </div>
            <div>
                <p>Download App</p>
                <img/>
            </div>
            <div></div>

        </div>         
            <div className='footer-copyright'>
                <hr/>
                <p>Copyright @ 2023 -All Right Reserved.</p>
            </div>
    </div>
  )
}

export default Footer