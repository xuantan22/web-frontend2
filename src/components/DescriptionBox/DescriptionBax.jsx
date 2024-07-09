import React, { useCallback, useEffect, useState, useContext } from 'react';
import './DescriptionBox.css';
import icon from '../Assets/cart_product_icon.png';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { API_BASE_URL } from '../../Api';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const DescriptionBox = () => {
  const { allProduct } = useContext(ShopContext);
  const { productId } = useParams();
  const [view, setView] = useState(true);
  const [nowReview, setNowReview] = useState({});
  const [getReview, setGetReview] = useState([]);

  const product = allProduct.find((e) => e.id === Number(productId));

  const onChange = useCallback(() => {
    setView(prevView => !prevView);
  }, []);

  const userId = document.cookie.split('; ').find(row => row.startsWith('userId')).split('=')[1];

  const [formData, setFormData] = useState({
    userId: userId,
    productId: product._id,
    rating: 1,
    comment: ""
  });
  const changeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitComment = async () => {
    let responseData;
    await fetch(`${API_BASE_URL}/createreview`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json()).then((data) => responseData = data);

    if (responseData.review) {
      setNowReview(formData);
    }

  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/${productId}/getreviewsbyproduct`)
      .then((res) => res.json())
      .then((data) => setGetReview(data));
  }, []);

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box" onClick={onChange}>Description</div>
        <div className="descriptionbox-nav-box fade" onClick={onChange}>Review</div>
      </div>
      {view ?
        <div className="descriptionbox-description">
          <p>An e-commerce website</p>
          <p>aaaaaaaaaaaaaaa</p>
        </div>
        :
        <>
          {getReview.length > 0 ? (getReview.map((review) => (
            <div key={review._id} className='descriptionbox-review'>
              <div className='descriptionbox-review-avatar'>
                <img src={icon} alt='avatar' />
              </div>
              <div className='descriptionbox-review-info'>
                <p className='descriptionbox-review-username'>{review?review.user:"hay tro thanh nguoi comment dau tien"}</p>
                <p className='descriptionbox-review-rate'>
                  {[...Array(review.rating)].map((_, i) => <StarBorderIcon key={i} />)}
                </p>
                <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                <p>{review.comment}</p>
              </div>
            </div>
          ))) : (
            <p>No reviews for this product</p>
          )
          }
          {nowReview.comment && (
            <div className='descriptionbox-review'>
              <div className='descriptionbox-review-avatar'>
                <img src={icon} alt='avatar' />
              </div>
              <div className='descriptionbox-review-info'>
                <p className='descriptionbox-review-username'>{nowReview.userId}</p>
                <p className='descriptionbox-review-rate'>
                  {[...Array(nowReview.rating)].map((_, i) => <StarBorderIcon key={i} />)}
                </p>
                <p>{nowReview.comment}</p>
              </div>
            </div>
          )}
          <div className='review'>
            <div className='review-input'>
              <input name='comment' value={formData.comment} onChange={changeData} placeholder='type here' />
              <NearMeOutlinedIcon onClick={submitComment} />
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default DescriptionBox;
