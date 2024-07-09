import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import upload_area from '../../../components/Assets/upload_area.svg'
import Cookies from 'js-cookie';
import { format, parse } from 'date-fns';

const Profile = () => {
  const [image, setImage] = useState(false);

  const id = Cookies.get('userId'); // Lấy giá trị của 'userId' từ cookie
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    phonenumber: "",
    gender: "",
    birthday: "",
    image: ""
  })
  useEffect(() => {
    fetch(`http://localhost:5000/getcurrentuser/${id}`)
      .then((res) => res.json())
      .then((user) => setUserInfo(user));
  }, [id]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }
  const [gender, setGender] = useState(userInfo.gender);

  const handleGenderChange = (event) => {
   setGender(event.target.value);
    changeHandler(event);
  };

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }
  const userUpdate = async () => {
    let responseData;
    let user = userInfo;
    if (image) {
      let formData = new FormData();
      formData.append('avatar', image);

      await fetch('http://localhost:5000/upload/avatar', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }).then((res) => res.json()).then((data) => { responseData = data });

      if (responseData.success) {
        user.image = responseData.image_url;
        console.log("Image upload sucess",user.image);

      } else {
        console.log("Image upload failed");
        return;
      }
    }
    await fetch(`http://localhost:5000/updateuser/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json()).then((data) => {
      data.success ? console.log(user): alert('user information Failed');
    });
  };
  console.log('image',image);
  console.log('user',userInfo);
  const getImageUrl = () => {
    // if (image) {
    //   return URL.createObjectURL(image);
    // } else if (userInfo.image) {
    //   return userInfo.image;
    // } else {
      return upload_area;
    // }
  };

  let date = new Date(userInfo.birthday);

// Extract the year, month, and day
const  formatDate = (date) => {
  let year = date.getFullYear();
  
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
  let day = ("0" + date.getDate()).slice(-2);
  return  `${year}-${month}-${day}`;
}

  return (
    <div className='hoso'>
      <div className='hoso-title'>
        <h1>Ho So Cua Toi</h1>
        <p>Quan Ly Thong Tin Ho So De Bao Mat Tai Khoan</p>
      </div>
      <div>

        <div className='hoso-info'>
          <div className='hoso-info-nickname'>
            <label>Ten dang nhap</label>
            <input value={userInfo.username} onChange={changeHandler} name='username' />
          </div>

          <div className='hoso-info-name'>
            <label>Ten</label>
            <input value={userInfo.name} onChange={changeHandler} name='name' />
          </div>

          <div className='hoso-info-email'>
            <label>Email: </label>
            <span onChange={changeHandler}>{userInfo.email}</span>
            <Link>Thay doi</Link>
          </div>

          <div className='hoso-info-phonenumber'>
            <label onChange={changeHandler}>So dien thoai</label><Link>Them</Link>
          </div>

          <div className='hoso-info-gender'>
            <label>Gioi Tinh :</label>
            <div>
              <input
                type="radio"
                value='male'
                name='gender'
                id='1'
                checked={gender === 'male' }
                onChange={handleGenderChange}
              />
              <label htmlFor='1'>Nam</label>
            </div>
            <div>
              <input
                type="radio"
                value='female'
                name='gender'
                id='2'
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              <label htmlFor='2'>Nữ</label>
            </div>
          </div>

          <div className='hoso-info-birthday'>
            <label>Ngay Sinh :</label>
            <input value={formatDate(new Date(userInfo.birthday))} onChange={changeHandler} type='date' name='birthday' />
          </div>
        </div>
        <label>avatar</label>
        <div className='hoso-info-image'>
          <label htmlFor='file-input'>
            <img src={image ? URL.createObjectURL(image) : (userInfo.image || upload_area)} alt="" className='addproduct-thumnail-img' />
          </label>
          <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
        </div>

      </div>
      <button onClick={userUpdate}>Lưu</button>
    </div>
  )
}
export default Profile;