import React, { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let i=0; i<300+1; i++ ){
        cart[i] = 0;
    }
    return cart
}
const ShopContextProvider = (props)=>{
    const [allProduct, setAllProduct]= useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    useEffect( ()=>{
     fetch("https://commerce-backend-154x.onrender.com/getallproducts")
        .then((res)=>res.json())
        .then((product)=>setAllProduct(product))

        if(localStorage.getItem('auth-token')){
            fetch('https://commerce-backend-154x.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            }).then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }

            
    },[])


//ADD PRODUCT TO CART
    const addToCart= async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            await fetch('https://commerce-backend-154x.onrender.com/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,

                },
                body:JSON.stringify({'itemId':itemId}),
            }).then((res)=>res.json()).then((data)=>console.log(data))
        }else{
            console.log("error");

        }
    }



    //remove product from cart
    const removeFromCart= async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            await fetch('https://commerce-backend-154x.onrender.com/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Content-Type':'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,

                },
                body:JSON.stringify({'itemId':itemId}),
            }).then((res)=>res.json()).then((data)=>console.log(data))
        }else{
            console.log("error");

        }
    }



    //get amount total of products
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProduct.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    //Get  product quantity is added in cart
    const getToTalProduct = ()=>{
        let totalProduct = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalProduct +=cartItems[item];
            }
        }
        return totalProduct;
    }
    
    const contextValue={allProduct,cartItems,addToCart,removeFromCart,getTotalCartAmount,getToTalProduct};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;