import {productImgPath} from "../utils/constants";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const {cardData} = props;
 
  const {id, name, cloudinaryImageId, avgRating, sla, cuisines, costForTwo} = cardData?.info;
  const {slaString} = sla;
  const ratingCol = (avgRating > 4) ? 'bg-green-600':'bg-yellow-500';

  return (
    <div className="rounded-lg m-1 p-4 hover:shadow-lg hover:border-2 text-[18px]">
      <Link to={`restaurant/${id}`}>
      <div className="">
      <img src={productImgPath + cloudinaryImageId} className="object-cover h-64 w-96 rounded-lg"></img>
      </div>
      <h2 className="p-2 font-bold">{name}</h2>
      <div className="flex justify-between">
        <span className={`${ratingCol} py-1 px-2 m-1 rounded-lg flex items-center`}>
          <svg className="w-4 h-4 ms-1 mx-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
          {avgRating}
        </span>
        <span>{slaString}</span>
      </div>
      <div className="grid grid-cols-1 gap-2 ">
        <span className="p-1">{cuisines.join(', ')}</span>
        <span className="p-1">{costForTwo}</span>
      </div>
      </Link>
    </div>
  );
};

export const RestaurantCardWithRating = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <span className="mx-2 my-2 py-1 px-2 bg-red-700 text-white font-bold rounded-lg absolute z-10">Top Rated ({props.cardData?.info?.totalRatingsString})</span>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
