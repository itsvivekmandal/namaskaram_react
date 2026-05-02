import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantDetails from "../utils/custom_hooks/useRestaurantDetails";
import Menu from "./Menu";


const RestuarantDetail = (props) => {
  const {details} = props;
  const {id, name, areaName, costForTwoMessage, cuisines, avgRating, totalRatingsString, sla, aggregatedDiscountInfo, aggregatedDiscountInfoV2} = details;
  return (
    <div className="w-6/12 mx-auto my-10 p-4">
      <span className="text-2xl font-bold">{name}</span>
      <div className="py-4 flex justify-between mt-10 border-b-gray-600 border-b-2 border-dotted">
        <div className="grid">
          <span className="text-xl font-bold mb-2">{name}</span>
          <span className="text-14px">{cuisines.join(', ')}</span>
          <span className="text-14px">{areaName}</span>
        </div>
        <div className="grid py-1 rounded shadow-lg border-2">
          <span className="mx-auto px-2 py-2 flex text-green-700 font-bold border-b-2 border-gray-200 items-center">
            <svg className="w-4 h-4 ms-1 mx-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            {avgRating}
          </span>
          <span className="mx-auto px-2 py-2 text-10px">{totalRatingsString}</span>
        </div>
      </div>
      <div className="grid mt-4">
        <div className="flex">
          <span className="font-bold text-md flex items-center">
            <svg className="RestaurantTimeCost_icon__8UdT4 mr-2" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="#3E4152" strokeWidth="1.3"></circle><path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="#3E4152"></path></svg>
            {sla.slaString}
          </span>
          <span className="font-bold text-md ml-4 flex items-center">
            <svg className="RestaurantTimeCost_icon__8UdT4 mr-2" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="9" cy="9" r="8.25" stroke="#3E4152" strokeWidth="1.5"></circle><path d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z" fill="#3E4152"></path></svg>
            {costForTwoMessage}
          </span>
        </div>
      </div>
    </div>
  )
};

const Restaurant = () => {
  
  const {id} = useParams();
  const RestaurantDetails = useRestaurantDetails(id);
  const [filteredRestaurantMenu, setFilteredRestaurantMenu] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [accordionStatus, setAccordionStatus] = useState({
    title: 'accordinaTitle',
    isOpen: false
  });

  useEffect(() => {
    const keys = Object.keys(RestaurantDetails);

    if(keys.length > 0) {
      const resDetails = RestaurantDetails?.cards[2]?.card?.card?.info ? RestaurantDetails?.cards[2]?.card?.card?.info : RestaurantDetails?.cards[0]?.card?.card?.info;
      const resMenus = RestaurantDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ? RestaurantDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards : RestaurantDetails?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      setRestaurantDetails(resDetails);
      setFilteredRestaurantMenu(resMenus);
    }
    
  }, [RestaurantDetails]);

  const accordionAction = (accordinaTitle) => {
    const updateAccordion = {
      title: accordinaTitle,
      isOpen: accordionStatus.title == accordinaTitle ? !accordionStatus.isOpen : true
    };

    setAccordionStatus(updateAccordion);
  };

  return restaurantDetails.length === 0 ? (<Shimmer />) : (
    <>
      <RestuarantDetail key={restaurantDetails?.id} details={restaurantDetails}/>
      {filteredRestaurantMenu.map((resMenu, index) => (
          <Menu key={index} menu={resMenu?.card} accordionAction={accordionAction} accordionStatus={accordionStatus}/> 
        ))
      }
    </>
  );
};

export default Restaurant;