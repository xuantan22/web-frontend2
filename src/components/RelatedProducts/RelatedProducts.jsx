import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import { API_BASE_URL } from '../../Api'
import Item from '../Item/Item'
const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/getrelationproducts`)
      .then((res) => res.json())
      .then((products) => setProducts(products))
  }, [])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {products.map((item, key) => {
          return <Item
            key={key}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts