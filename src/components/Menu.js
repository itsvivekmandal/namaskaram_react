import { useState } from "react";
import {productImgPath} from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";
import MenuItem from "./MenuItem";

const Menu = (props) => {
  const {menu, accordionAction, accordionStatus} = props;
  const title = menu?.card?.title ? menu?.card?.title : '';
  const items = menu?.card?.itemCards ? menu?.card?.itemCards : '';

  return (title == '' || items == '') ? (<></>) : (
    <div className="w-6/12 m-auto my-4 p-4 rounded-lg shadow-lg border-2 hover:cursor-pointer" onClick={() => accordionAction(title)}>
      <div className="flex justify-between font-bold">
        <span className="text-lg">{title} ({items.length})</span>
        <button>
          {
            (accordionStatus.title == title && accordionStatus.isOpen) ? 
            (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <polyline points="6 15 12 9 18 15" />
            </svg>) : 
            (<svg className="h-8 w-8 text-gray-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>)
          }
        </button>
      </div>
      {
        (accordionStatus.title == title && accordionStatus.isOpen) && 
        <>
          {items.map(item => (
            <MenuItem key={item?.card?.info?.id} data={item?.card?.info}/>
            ))
          }
        </>
      }
    </div>
  )
};

export default Menu;