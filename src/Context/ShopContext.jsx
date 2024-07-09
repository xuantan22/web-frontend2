import React, { createContext, useEffect, useState } from 'react'
import { API_BASE_URL } from '../Api';
export const ShopContext = createContext(null);
// const getDefaultCart = () => {
//     let cart = {};
//     for (let i = 0; i < 300 + 1; i++) {
//         cart[i] = 0;
//     }
//     return cart
// }
const ShopContextProvider = (props) => {
    const [allProduct, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('auth-token')?localStorage.getItem('auth-token'):'');
    useEffect(() => {
        fetch(`${API_BASE_URL}/getallproducts`)
            .then((res) => res.json())
            .then((product) => setAllProduct(product))

        if (localStorage.getItem('auth-token')) {
            fetch(`${API_BASE_URL}/getcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((res) => res.json())
                .then((data) => setCartItems(data))
        }
        console.log(cartItems);

    }, [])

    //ADD PRODUCT TO CART
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (localStorage.getItem('auth-token')) {
            await fetch(`${API_BASE_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,

                },
                body: JSON.stringify({ 'itemId': itemId }),
            }).then((res) => res.json()).then((data) => console.log(data))
        } else {
            console.log("error");

        }
    }



    //remove product from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            await fetch(`${API_BASE_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,

                },
                body: JSON.stringify({ 'itemId': itemId }),
            }).then((res) => res.json()).then((data) => console.log(data))
        } else {
            console.log("error");

        }
    }

    const deleteFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[itemId];
            return updatedCart;
        });

        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${API_BASE_URL}/deletefromcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                    },
                    body: JSON.stringify({ itemId: itemId }),
                });

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Failed to delete item from cart:", error);
            }
        } else {
            console.log("No auth token found. Unable to delete item from cart.");
        }
    }




    //get amount total of products
    // const getTotalCartAmount = () => {
    //     if (!cartItems || cartItems.length === 0) return 0;

    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = allProduct.find((product) => product.id === Number(item));
    //             totalAmount += itemInfo.new_price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }
    const getTotalCartAmount = () => {
        if (!cartItems || Object.keys(cartItems).length === 0) return 0;
    
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProduct.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };
    

    //Get  product quantity is added in cart
    const getToTalProduct = () => {
        let totalProduct = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalProduct += cartItems[item];
            }
        }
        return totalProduct;
    }

    //update item quantity

    // const updateCartItemQuantity = (id, quantity) => {
    //     setCartItems((prev) => ({
    //         ...prev,
    //         [id]: quantity
    //     }));
    // };


    const contextValue = {
        allProduct, cartItems, addToCart,
        removeFromCart, getTotalCartAmount,
        getToTalProduct, deleteFromCart,token

    };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;