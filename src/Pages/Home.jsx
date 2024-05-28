import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollectios from '../components/NewCollections/NewCollectios'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offers/>
        <NewCollectios/>
        <NewsLetter/>
        <RelatedProducts/>
    </div>
  )
}

export default Home