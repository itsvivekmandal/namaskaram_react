import { useEffect, useState } from "react";
import {productImgPath} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItem } from "../utils/CartSlice";
// import { updateItem } from "../utils/CartSlice";

const MenuItem = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);
  const [item, setItem] = useState([]);
  const [itemExist, setItemExist] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const {data} = props;
  const {id, price, name, defaultPrice, offerTags, imageId, isVeg, category} = data;
  const finalPrice = price ? price: defaultPrice;
  const veg = isVeg ? 'green':'red';
  const offer = offerTags ? `${offerTags[0].title} | ${offerTags[0].subTitle}` : '';

  const addToCart = (e, items) => {
    // console.log(items);
    const count = 1;
    dispatch(addItem({id: items.id, itemCount: count, items:items}));
    e.stopPropagation(); // To prevent parent onClick function action
  };

  useEffect(() => {
    cartItems.items.forEach(element => {
      if(element.id === id) {
        setItemExist(true);
        setItemCount(element.itemCount);
        setItem(element);
      }
    });
  }, [cartItems]);

  const cartAction = (e, name, data) => {
    const count = 1;
    // console.log(data.itemCount - count);
    e.stopPropagation(); // To prevent parent onClick function action
    if(name === 'add') {
      dispatch(addItem({id: data.id, itemCount: count, items:data}));
    } else {
      if(data.itemCount - count < 1) {
        dispatch(clearItem({id: data.items.id}));
        setItemExist(false);
        setItemCount(data.itemCount - count);
      } else {
        dispatch(removeItem({id: data.items.id, itemCount: count, items:data.items}));
      }
    }
  };

  return (
    <div className="flex py-6 justify-between border-b-2 border-gray-200">
      <div className="grid">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="5" fill={veg} />
          <rect x="0" y="0" width="20" height="20" fill="none" stroke={veg} strokeWidth="1"/>
        </svg>
        <span>{name}</span>
        <div className="flex items-center">
          <span>₹{finalPrice/100}</span>
          <span className="text-sm mx-2 px-2 rounded-lg border-red-500 border-l-4 bg-red-300">{offer}</span>
        </div>
      </div>
      <div className="relative w-36 h-full flex flex-col items-center justify-center border-2">
        <img src={productImgPath + imageId} alt="img" className="w-32"></img>
        {
          itemExist ? (<div className="flex font-bold justify-between border-2 absolute -bottom-4 text-green-600 bg-gray-100 hover:bg-gray-200">
          <button name="remove" className="px-2 py-1"
            onClick={(e) => cartAction(e, e.target.name, item)}
          >－</button>
          <span className="px-2 py-1">{itemCount}</span>
          <button name="add" className="px-2 py-1"
            onClick={(e) => cartAction(e, e.target.name, data)}
          >＋</button>
        </div>):(<button className="type-button w-28 py-2 px-1 font-bold rounded-md shadow-xl absolute -bottom-4 text-green-600 bg-gray-100 hover:bg-gray-200"
          onClick={(e) => addToCart(e, data)}>Add +</button>)
        }
      </div>
    </div>
  );
};

export default MenuItem;