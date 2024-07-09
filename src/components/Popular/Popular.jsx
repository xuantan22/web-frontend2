import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { API_BASE_URL } from '../../Api'
const Popular = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/getpopularproducts`)
      .then((res) => res.json())
      .then((product) => setPopularProduct(product))
  }, [])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProduct.map((item, key) => {
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

export default Popular