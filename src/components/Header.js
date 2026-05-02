import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { logo, avatar } from '../utils/constants';
import { useState } from 'react';
import useOnlineStatus from '../utils/custom_hooks/useOnlineStatus';
import UserContext from '../utils/UserContext';
import {useSelector } from 'react-redux';

const Header = () => {
  const items = useSelector(state => state.cart.items);
  const [authBtnName, setAuthBtnName] = useState('Login');
  const {loggedInUser, avatar} = useContext(UserContext);
  const color = useOnlineStatus() ? 'green':'red';
  
  return (
    <div className="flex justify-between bg-white shadow-md sticky top-0 z-20">
      <div className="w-1/3 mx-2 px-4">
        <Link to={'/'}>
          <img 
            className="w-24"
            src={logo}
          />
        </Link>
      </div>
      <div className="w-1/2 mx-4 py-6 px-4 flex items-center justify-between">
        <div className='w-1/2'>
          <ul className="flex">
            <li className="mx-2 whitespace-nowrap"><Link to={'/'}>Home</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'about'}>About Us</Link></li>
            <li className="mx-2 whitespace-nowrap"><Link to={'/contact'}>Contact Us</Link></li>
            {/* <li className="mx-2 whitespace-nowrap"><Link to={'/cart'}>Cart - ({items.length })</Link></li> */}
            <li className="mx-2 whitespace-nowrap font-bold">{loggedInUser}</li>
          </ul>
        </div>
        <Link className='flex w-10 ml-4 relative' to={'/cart'}>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Cart"><path d="M21.5,15a3,3,0,0,0-1.9-2.78l1.87-7a1,1,0,0,0-.18-.87A1,1,0,0,0,20.5,4H6.8L6.47,2.74A1,1,0,0,0,5.5,2h-2V4H4.73l2.48,9.26a1,1,0,0,0,1,.74H18.5a1,1,0,0,1,0,2H5.5a1,1,0,0,0,0,2H6.68a3,3,0,1,0,5.64,0h2.36a3,3,0,1,0,5.82,1,2.94,2.94,0,0,0-.4-1.47A3,3,0,0,0,21.5,15Zm-3.91-3H9L7.34,6H19.2ZM9.5,20a1,1,0,1,1,1-1A1,1,0,0,1,9.5,20Zm8,0a1,1,0,1,1,1-1A1,1,0,0,1,17.5,20Z" fill="#34a853" className="color000000 svgShape"></path></svg>
          {items.length > 0 && (
            <span className='-mt-3 ml-6 px-2 absolute font-bold text-white item-center  w-6 h-6 bg-red-600 rounded-full'>{items.length}</span>
          )}
        </Link>
        <div className='w-12 flex ml-4'>
          <div className='relative'>
            <img className="w-10 rounded-full" src={avatar} alt="avatar" />
          </div>
        </div>
        <button name={authBtnName} className="bg-blue-600 py-2 px-4 mx-4 w-1/6" onClick={() => {
          authBtnName == 'Login' ? setAuthBtnName('Logout'):setAuthBtnName('Login');
        }}>{authBtnName}</button>
      </div>
    </div>
  );
};

export default Header;