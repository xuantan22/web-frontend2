import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { API_BASE_URL } from '../../Api';
import Cookies from 'js-cookie';

const PlaceOrder = () => {
  const { getTotalCartAmount, allProduct, cartItems, token } = useContext(ShopContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const id = Cookies.get('userId');

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = allProduct
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));
  
    let orderData = {
      userId: id,
      items: orderItems, // Ensure this matches the schema field
      amount: getTotalCartAmount(),
      address: data,
    };
  console.log(orderData);
    try {
      let response = await axios.post(`${API_BASE_URL}/order`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };
  
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} type='text' value={data.firstName} placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} type='text' value={data.lastName} placeholder='Last Name' />
        </div>
        <div className='multi-fields'>
          <input required name='email' onChange={onChangeHandler} type='text' value={data.email} placeholder='Email' />
        </div>
        <div className='multi-fields'>
          <input required name='street' onChange={onChangeHandler} type='text' value={data.street} placeholder='Street' />
        </div>
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} type='text' value={data.city} placeholder='City' />
          <input required name='state' onChange={onChangeHandler} type='text' value={data.state} placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} type='text' value={data.zipcode} placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} type='text' value={data.country} placeholder='Country' />
        </div>
        <div className='multi-fields'>
          <input required name='phone' onChange={onChangeHandler} type='text' value={data.phone} placeholder='Phone' />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
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
          <button type='submit'>Checkout</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
