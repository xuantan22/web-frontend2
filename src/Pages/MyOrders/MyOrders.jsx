import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import { API_BASE_URL } from '../../Api';
import axios from 'axios';

const MyOrders = () => {
    const {token} = useContext(ShopContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () =>{
        const response = await axios.post(`${API_BASE_URL}/userorders`,{}, {headers:token});
        setData(response.data.data);
    }

    useEffect(()=> {
        if(token) {
            fetchOrders();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders </h2>
        <div className="container">
            {data.map((order, index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <img alt='image'/>
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name + "x" + item.quantity
                            }else{
                                return item.name + "x" + item.quantity + ","

                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.state}</b></p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders