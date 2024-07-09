import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/remove_icon.png'
import './CartItems.css'
const CartItems = ({ product }) => {
    const { cartItems, removeFromCart, addToCart, deleteFromCart } = useContext(ShopContext);
    const cartItemCount = cartItems[product._id] || 0;

    const handleAddToCart = () => {
        addToCart(product._id);
    };
    const handleRemoveFromCart = () => {
        if (cartItemCount > 1) {
            removeFromCart(product._id);
        }
    };
    const handleDeleteFromCart = () => {
        if (cartItemCount > 0) {
            deleteFromCart(product._id);
        }
    }
    return (
        <div className="cartitems-format cartitems-format-main">
            <img src={product.image} alt="" className='carticon-product-icon' />
            <p>{product.name}</p>
            <p>{product.new_price}</p>
            <div className='cartitems-quantity-change'>
                <span className='cartitems-quantity-decrease' onClick={handleRemoveFromCart}>-</span>
                <span className='cartitems-quantity'>{cartItems[product._id]}</span>
                <span className='cartitems-quantity-increase' onClick={handleAddToCart}>+</span>
            </div>
            <p>${product.new_price * cartItems[product._id]}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={handleDeleteFromCart} alt="" />
        </div>
    )
}

export default CartItems