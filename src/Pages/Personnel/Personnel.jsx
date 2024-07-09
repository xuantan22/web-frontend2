import React, {  useEffect, useState } from 'react'
import './Personnel.css'
import navProfile from '../../components/Assets/nav-profile.svg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PercentIcon from '@mui/icons-material/Percent';
import MenuOption from '../MenuOption';
import Cookies from 'js-cookie';

const Personnel = () => {
    const id = Cookies.get('userId');
    const [drop, setDrop] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [option, setOption] = useState('donmua');
    // const [data, setData] = useState(null);
    const [activeItem, setActiveItem] = useState('donmua');

    const [avatar, setAvatar] = useState();
    const [user, setUser] = useState('no name');
    useEffect(() => {
        fetch(`http://localhost:5000/getcurrentuser/${id}`)
          .then((res) => res.json())
          .then((user) => setUser(user));
          
      }, [id]);
    const handleClick = (item) => {
        setOption(item);
        setActiveItem(item);
    }; return (
        <div className='personnel'>
            <div className='personnel-slide'>
                <div className='personnel-slide-avatar'>
                    <img src={user ? user.image:navProfile} alt='avatar' />
                    <div className='personnel-username'>
                        <h4>{user.name}</h4>
                        <p>Sua ho so</p>
                    </div>
                </div>
                <div className='personnel-slide-menu'>
                    <div>
                        <p>
                            <PersonOutlineIcon />
                            <span name="taikhoancuatoi" onClick={() => setDrop((prev) => !prev)}>Tai khoan cua toi</span>
                        </p>
                                <ul className={`personnel-slide-menu-lists ${drop ? 'show' : ''}`}>
                                    <li className={activeItem === 'hoso' ? 'active' : ''} onClick={() => handleClick('hoso')}>Ho So</li>
                                    <li className={activeItem === 'nganhang' ? 'active' : ''} onClick={() => handleClick('nganhang')}>Ngan Hang</li>
                                    <li className={activeItem === 'diachi' ? 'active' : ''} onClick={() => handleClick('diachi')}>Dia Chi</li>
                                    <li className={activeItem === 'doimatkhau' ? 'active' : ''} onClick={() => handleClick('doimatkhau')}>Doi Mat Khau</li>
                                    <li className={activeItem === 'caidatthongbao' ? 'active' : ''} onClick={() => handleClick('caidatthongbao')}>Cai Dat Thong Bao</li>
                                    <li className={activeItem === 'thietlaprieng' ? 'active' : ''} onClick={() => handleClick('thietlaprieng')}>Nhung Thiet Lap Rieng</li>
                                </ul>
                        <p>
                            <EditNoteIcon />
                            <span className={activeItem === 'donmua' ? 'active' : ''} onClick={() => setOption('donmua')}>Don Mua</span>
                        </p>
                        <p>
                            <NotificationsNoneIcon />
                            <span name="donhang" onClick={() => setDrop2((prev) => !prev)}>Thong Bao</span>

                        </p>
                            <ul className={`personnel-slide-menu-lists ${drop2 ? 'show' : ''}`}>
                                <li className={activeItem === 'capnhatdonhang' ? 'active' : ''} onClick={() => handleClick('capnhatdonhang')}>Cap Nhat Don Hang</li>
                                <li className={activeItem === 'khuyenmai' ? 'active' : ''} onClick={() => handleClick('khuyenmai')}>Khuyen Mai</li>
                                <li className={activeItem === 'capnhatvi' ? 'active' : ''} onClick={() => handleClick('capnhatvi')}>Cap Nhat Vi</li>
                            </ul> 
                        <p>
                            <PercentIcon />
                            <span onClick={() => setOption('khovoucher')}>Kho Voucher</span>
                        </p>
                        <p>
                            <LocalAtmIcon />
                            <span onClick={() => setOption('shopxu')}>Shop Xu</span>
                        </p>

                    </div>

                </div>
                <div>

                </div>
            </div>
            <div></div>
            <div className='personnel-content'>
                <MenuOption option={option} />
            </div>
        </div>
    )
}

export default Personnel