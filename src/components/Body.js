import RestaurantCard, { RestaurantCardWithRating }from "./RestuarantCard";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import OnMind from "./OnMind";
import useRestaurant from "../utils/custom_hooks/useRestaurant";
import UserContext from "../utils/UserContext";
// import {data} from '../utils/mockData';

const Body = () => {
  let machedName = [];
  
  const Restaurants = useRestaurant([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [search, setSearch] = useState([]);
  const [onMind, setOnMind] = useState([]);
  const [heading, setHeading] = useState([]);
  const [filterButton, setFilterButton] = useState('');
  const {loggedInUser, setUserName} = useContext(UserContext);

  useEffect(() => {
    const keys = Object.keys(Restaurants);
    
    if (keys.length > 0) {
      setRestaurantList(
        Restaurants?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      setFilteredRestaurant(
        Restaurants?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    
      setOnMind(Restaurants?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
      setHeading(Restaurants?.data?.cards[0]?.card?.card?.header?.title)
    }
  }, [Restaurants]);

  const fileterButtonAction = (buttonName) => {
    setFilterButton(prevbuttonName => {return prevbuttonName == buttonName ? '' : buttonName});

    if(filterButton !== buttonName && buttonName == 'costLimit') {
      machedName = restaurantList.filter((res) => {
        let match = res.info.costForTwo.match(/\d+/);
        let cost = parseInt(match[0], 10);
        return cost < 300;
      });
      setFilteredRestaurant(machedName);
    } else if(filterButton !== buttonName && buttonName == 'costRange') {
      machedName = restaurantList.filter((res) => {
        let match = res.info.costForTwo.match(/\d+/);
        let cost = parseInt(match[0], 10);
        return (cost >= 300 && cost <= 600) ;
      });
      setFilteredRestaurant(machedName);
    } else if(filterButton !== buttonName && buttonName == 'foodType') {
      machedName = restaurantList.filter((res) => {
        return res?.info?.veg === true ;
      });
      setFilteredRestaurant(machedName);
    } else if(filterButton !== buttonName && buttonName == 'deliveryType') {
      let sortedListByTime = [...restaurantList];
      sortedListByTime.sort((a,b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime)
      setFilteredRestaurant(sortedListByTime);
    } else {
      setFilteredRestaurant([...restaurantList]);
    }

  };

  const cancelIcon = '&#10006;';
  const TopRatedRestaurant = RestaurantCardWithRating(RestaurantCard);

  /////////////// scroll ///////////////
  const scroll = (name) => {
    const distance = name === 'scrollForward' ? '400':'-400';
    const container = document.getElementById('scrollContainer');
    container.scrollBy({
      left: distance, // Adjust as needed for scroll distance
      behavior: 'smooth'
    });
  };
  /////////////// scroll ///////////////

  return restaurantList.length ===  0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="p-4 m-2 flex justify-between">
        <div className="text-[30px] font-bold">{heading}</div>
        <div className="">
          <button name="scrollBackward" className="p-2 text-[18px] font-bold m-2 rounded-full shadow-lg border-2" onClick={() => scroll('scrollBackward')}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 text-[18px] font-bold m-2 rounded-full shadow-lg border-2" onClick={() => scroll('scrollForward')}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 m-2">
        <div id="scrollContainer" className="overflow-x-auto flex scroll-hide">
          {
            onMind.map(ele => (
              <OnMind key={ele.id} data={ele} />
            ))
          }
        </div>
      </div>
     <div className="p-4 m-2 flex justify-between">
        <h1 className="text-[30px] font-bold">Restaurants with online food delivery</h1>
        <div className="flex items-center">
          <label className="font-bold">Context example</label>
          <input type="text" className="shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200 focus:outline-none"
              value={loggedInUser}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
        </div>
      </div>
      <div className="flex p-4 m-4 items-center">
        <input type="text" className="shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200 focus:outline-none"
          placeholder="Search food by name"
          onKeyUp={(e) => {
            let newChar = e.target.value.toLowerCase();
            machedName = restaurantList.filter((res) => res.info.name.toLowerCase().includes(newChar));
            setFilteredRestaurant(machedName);
          }}
        />
        <div className="custom-select">
          <select className="shadow-lg block appearance-none w-56 bg-white border-2 text-gray-700 px-4 py-2.5 mx-2 rounded-lg leading-tight focus:outline-none focus:bg-white focus:shadow-lg" onChange={(e) => {
            topRatedList = restaurantList.filter((res) => res.info.avgRating > e.target.value);
            setFilteredRestaurant(topRatedList);
          }}>
            <option value="">Filter By Ratings</option>
            <option value="5">5</option>
            <option value="4.5">4.5</option>
            <option value="4.2">4.2</option>
            <option value="4">4</option>
            <option value="3.5">3.5</option>
            <option value="3">3</option>
          </select>
          {/* <div className="arrow"> */}
            <svg className="arrow h-8 w-8 text-gray-600"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="6 9 12 15 18 9" /></svg>
            {/* </div> */}
        </div>
        <button type="button" className={`${filterButton == 'costLimit' && 'bg-gray-200'} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
          onClick={() => {fileterButtonAction('costLimit')}}
        >{filterButton == 'costLimit' ? 'Less than Rs. 300 \u2716': 'Less than Rs. 300'}</button>
        <button type="button" className={`${filterButton == 'costRange' && 'bg-gray-200'} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
          onClick={() => {fileterButtonAction('costRange')}}
        >{filterButton == 'costRange' ? 'Rs. 300 - Rs. 600 \u2716': 'Rs. 300 - Rs. 600'}</button>
        <button type="button" className={`${filterButton == 'foodType' && 'bg-gray-200'} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
          onClick={() => {fileterButtonAction('foodType')}}
        >{filterButton == 'foodType' ? 'Pure Veg \u2716': 'Pure Veg'}</button>
        <button type="button" className={`${filterButton == 'deliveryType' && 'bg-gray-200'} shadow-lg border-2 px-4 py-2 mx-2 rounded-lg hover:bg-gray-200`}
          onClick={() => {fileterButtonAction('deliveryType')}}
        >{filterButton == 'deliveryType' ? `Fast Delivery \u2716` : 'Fast Delivery'}</button>
        <input type="text" className="shadow-lg border-2 px-4 py-2 ml-2 rounded-lg hover:bg-gray-200 focus:outline-none"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
      </div>
      <div className="grid grid-cols-5 gap-2 px-4">
        {/* {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} cardData={restaurant} />
        ))} */}

        {filteredRestaurant.map((restaurant) => (
          (restaurant.info.totalRatingsString.includes('K') && restaurant.info.totalRatingsString.slice(0, -2)) > 5 ?
           (<TopRatedRestaurant key={restaurant.info.id} cardData={restaurant} />):
           (<RestaurantCard key={restaurant.info.id} cardData={restaurant} />)
        ))}
      </div>
    </div>
  );
};

export default Body;
