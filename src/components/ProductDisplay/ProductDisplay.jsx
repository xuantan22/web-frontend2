import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const Addnotify = () => {
        addToCart(product._id);
        toast.success("Product is Added!")
    }
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {product && product.image && <img className='productdisplay-main-img' src={product.image} alt="Product" />}
                    {product && product.image && <img className='productdisplay-main-img' src={product.image} alt="Product" />}
                    {product && product.image && <img className='productdisplay-main-img' src={product.image} alt="Product" />}
                    {product && product.image && <img className='productdisplay-main-img' src={product.image} alt="Product" />}
                </div>
                <div className="productdisplay-img">
                    {product && product.image && <img className='productdisplay-main-img' src={product.image} alt="Product" />}
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product && product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className='productdisplay-right-prices'>
                    <div className="productdisplay-right-price-old">${product && product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product && product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    afiafaijifuiejruijiew8jhyoeph,oeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                </div>
                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-size'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>

                    </div>
                </div>
                <button className='productdisplay-add-btn' onClick={ Addnotify}>
                    ADD To Cart
                </button>
                <ToastContainer />
                <p className='productdisplay-right-category'>
                    <span>Category :</span>Women, T-shirt, Crop Top
                </p>
                <p className='productdisplay-right-category'>
                    <span>Tags :</span>Modern, Latest
                </p>
            </div>
        </div>
    )
}

export default ProductDisplay