import { Link, Select } from '@mui/material';
import React, { useState } from 'react';
import '../Pages/CSS/MenuOption.css'
import upload_area from '../components/Assets/upload_area.svg'
import Profile from './SettingPages/Profile/Profile';

const MenuOption = ({ option }) => {
  if (!option) {
    return <div>Loading...</div>;
  }

  switch (option) {
    case 'hoso':
     return <Profile />
    case 'nganhang':
      return <div>data.nganhangContent</div>;
    case 'diachi':
      return <div>data.diachiContent</div>;
    case 'doimatkhau':
      return <div>data.doimatkhauContent</div>;
    case 'caidatthongbao':
      return <div>data.caidatthongbaoContent</div>;
    case 'nhungthietlaprieng':
      return <div>data.nhungthietlapriengContent</div>;
    case 'donmua':
      return <div>data.donmuaContent</div>;
    case 'capnhatdonhang':
      return <div>data.capnhatdonhangContent</div>;
    case 'khuyenmai':
      return <div>data.khuyenmaiContent</div>;
    case 'capnhatvi':
      return <div>data.capnhatviContent</div>;
    case 'khovoucher':
      return <div>data.khovoucherContent</div>;
    case 'shopxu':
      return <div>data.shopxuContent</div>;
    default:
      return <div>Select an option from the menu</div>;
  }
};

export default MenuOption;
