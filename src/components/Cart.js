import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import {productImgPath} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItem, clearCart} from "../utils/CartSlice";

const CartItem = ({data}) => {
  // const {data} = props;
  const dispatch = useDispatch();
  const {price, name, defaultPrice, offerTags, imageId, isVeg, category} = data.items;
  const veg = isVeg ? 'green':'red';
  const offer = offerTags ? `${offerTags[0].title} | ${offerTags[0].subTitle}` : '';
  const finalPrice = price ? price: defaultPrice;
  const priceInRupees = finalPrice/100;
  const totalPrice = (priceInRupees*data.itemCount).toFixed(2);
  const itemCount = data.itemCount;

  const cartAction = (e, name, data) => {
    const count = 1;
    // console.log(data.itemCount - count);
    e.stopPropagation(); // To prevent parent onClick function action
    if(name === 'add') {
      dispatch(addItem({id: data.items.id, itemCount: count, items:data.items}));
    } else {
      if(data.itemCount - count < 1) {
        dispatch(clearItem({id: data.items.id}));
      } else {
        dispatch(removeItem({id: data.items.id, itemCount: count, items:data.items}));
      }
    }
  };

  return (
    <div className="flex items-center p-2 my-2 justify-between">
      <svg className="w-8" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="5" fill={veg} />
        <rect x="0" y="0" width="20" height="20" fill="none" stroke={veg} strokeWidth="1"/>
      </svg>
      <div className="w-1/2 ml-4 text-16px">
        <span>{name}</span>
      </div>
      <div className="flex w-1/4 ml-4 font-bold justify-between border-2">
        <button name="remove" className="px-2 py-1"
          onClick={(e) => cartAction(e, e.target.name, data)}
        >－</button>
        <span className="px-2 py-1 text-green-600">{itemCount}</span>
        <button name="add" className="px-2 py-1"
          onClick={(e) => cartAction(e, e.target.name, data)}
        >＋</button>
      </div>
      <div className="flex w-1/4 ml-4 text-lg justify-end">
        <span>₹ {totalPrice}</span>
      </div>
    </div>
  )
};

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const cartAction = () => {
    dispatch(clearCart());
  };

  const checkout = () => {
    console.log('checkout invoked!');
  }

  let cartPrice = 0;
  items.forEach(element => {
    const {price, defaultPrice} = element.items;
    const finalPrice = price ? price: defaultPrice;
    const priceInRupees = finalPrice/100;
    cartPrice += parseInt((priceInRupees*element.itemCount).toFixed(2));
  });

  const tax = (cartPrice*18/100).toFixed(2);
  const tip = 20;
  const total = parseInt(tip) + parseInt(cartPrice) + parseInt(tax);
  const deliveryFee = 45;

  return items.length === 0 ? (
    <div className="w-4/12 mx-auto mt-10 p-4 font-bold text-4xl text-center">Not Item Added</div>
  ):(
    <div className="w-4/12 mx-auto m-10 p-4 border-2 shadow-lg">
      <div className="border-b-2 border-black border-dotted pb-5">
        {
          items.map((item, index) => (
            <CartItem key={index} data={item} />
            ))
          }
        <div className="flex justify-end my-4">
          <button className="py-2 px-4 shadow-lg border-2 bg-red-600 rounded-md hover:bg-red-700 text-white transition duration-300"
            onClick={() => cartAction()}
            >Clear Cart</button>  
        </div>
      </div>
      <div className="flex mt-2 justify-between px-4 py-2 border-b-2 border-gray-200">
        <div className="grid">
          <span className="py-2">Item Total</span>
          <span className="py-2">Delivery Fee | 1.5 kms</span>
        </div>
        <div className="grid justify-items-end">
          <span className="py-2">₹ {cartPrice}</span>
          <span className="py-2">₹ {deliveryFee}</span>
        </div>
      </div>
      <div className="flex mt-2 justify-between px-4 py-2 border-b-2 border-black">
        <div className="grid">
          <span className="py-2">Delivery Tip</span>
          <span className="py-2">GST and Restaurant Charges (18%)</span>
        </div>
        <div className="grid justify-items-end">
          <span className="py-2">₹ {tip}</span>
          <span className="py-2">₹ {tax}</span>
        </div>
      </div>
      <div className="flex mt-2 justify-between px-4 py-2">
        <div className="grid">
          <span className="text-lg font-bold py-2">TO PAY</span>
        </div>
        <div className="grid justify-items-end">
          <span className="text-lg font-bold py-2">₹ {total}</span>
        </div>
      </div>
      <div className="flex justify-end my-4">
          <button className="py-2 px-4 shadow-lg border-2 border-green-200 rounded-md hover:bg-green-700 text-white transition duration-300 bg-green-600"
            onClick={() => checkout()}
            >Checkout</button>  
        </div>
    </div>
  );
};

export default Cart;