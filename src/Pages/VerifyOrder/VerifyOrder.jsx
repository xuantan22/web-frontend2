import React, { useContext, useEffect } from 'react'
import './VerifyOrder.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { API_BASE_URL } from '../../Api';
const VerifyOrder = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get('orderId');
    // console.log(success, orderId);
    const verifyPayment = async() =>{
        const response  = await axios.post(`${API_BASE_URL}/verify`,{success, orderId});
        if(response.data.success){
            navigate('/myorders');
        }else{
            navigate('/')
        }
    }
    useEffect(() => {
        verifyPayment();
    },[]);
  return (
    <div className='verify'>
        <div className='spinner'>

        </div>
    </div>
  )
}

export default VerifyOrder