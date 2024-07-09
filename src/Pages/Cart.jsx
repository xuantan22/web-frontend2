import React, { useContext } from 'react'
import CartItems from '../components/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext'
import './CSS/Cart.css'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const { allProduct, cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {allProduct.map((e, i) => {
        if (cartItems[e._id] > 0) {
          return <div key={i}>
            <CartItems product={e} />
          </div>
        }
        return null;
      })}
      <div className='cartitems-down'>
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtatal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promote code, Enter in here</p>:
          <div className='cartitems-promobox'>
            <input type='text' placeholder='promo-code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart